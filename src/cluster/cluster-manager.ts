import cluster, { Worker } from "node:cluster"
import getDb from "../utils/get-db"
import { createServer } from "node:http"
import sendResponse from "../utils/send-response"
import { URL } from "node:url"
import Server from "../server/server"
import { userRouter } from "../api/users"
import getRequestBody from "../utils/get-request-body"
import IPrimaryResponse from "./iprimary-response"
import HttpError from "../errors/http-error"
import os from "node:os";

export default class ClusterManager {
  workerNumber: number
  primaryPort: number
  constructor() {
    this.workerNumber = os.cpus().length - 1;
    this.primaryPort = Number(process.env.PORT_NUMBER) || 4000
    if (this.workerNumber < 1) {
      throw new Error("Multi mode is not available")
    }
  }

  start() {
    if (cluster.isPrimary) {
      this.startPrimaryServer()
      for (let i = 0; i < this.workerNumber; i += 1) {
        const worker = cluster.fork({ WORKER_PORT: this.primaryPort + i + 1 })
        this.listenWorker(worker)
      }
    } else {
      const workerPort = Number(process.env.WORKER_PORT)
      if (workerPort) {
        console.log(`I'm worker. My port: ${workerPort}`)
        this.startWorkerServer(workerPort)
      }
    }
  }

  startPrimaryServer() {
    const primaryServer = createServer()
    primaryServer.listen(this.primaryPort)
    let i = 1
    primaryServer.on("request", async (req, res) => {
      try {
        if (req.url && req.method) {
          const url = new URL(
            req.url,
            `http://${process.env.HOST}:${this.primaryPort + i}`
          )
          const body = await getRequestBody(req)
          const workerResponse = await fetch(url.href, {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
          const data = await workerResponse.json()
          console.log("Reply from worker on port: ", this.primaryPort + i)
          sendResponse({ res, code: workerResponse.status, message: data })
          i = i === this.workerNumber ? 1 : i + 1
        }
      } catch (err) {
        if (err instanceof HttpError) {
          sendResponse({ res, code: err.code, message: err.message })
        } else if (err instanceof Error) {
          sendResponse({ res, code: 500, message: err.message })
        } else {
          sendResponse({ res, code: 500, message: String(err) })
        }
      }
    })
    process.on("SIGINT", () => {primaryServer.close(); process.exit(0)})
    process.on("exit", () => primaryServer.close())
    process.on("SIGTERM", () => {primaryServer.close(); process.exit(0)})
  }

  startWorkerServer(port: number) {
    const workerServer = new Server(port)
    workerServer.addRouter(userRouter)
    workerServer.start()
    process.on("SIGINT", () => {workerServer.close(); process.exit(0)});
    process.on("exit", () => workerServer.close())
    process.on("SIGTERM", () => {workerServer.close(); process.exit(0)});
  }

  listenWorker(worker: Worker) {
    worker.on("message", async (message) => {
      try {
        const content = message as Record<string, unknown>
        if (content["request"]) {
          const db = await getDb()
          worker.send({ db: db })
        }
        if (content["db"]) {
          const workerMessage = message as IPrimaryResponse
          const records = workerMessage.db
          const db = await getDb()
          db.records = records.records
        }
      } catch (err) {
        console.log(err)
      }
    })
  }
}
