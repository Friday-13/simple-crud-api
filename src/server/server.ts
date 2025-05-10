import {
  createServer,
  Server as HttpServer,
  IncomingMessage,
  ServerResponse,
} from "node:http"
import Router from "../routing/router"
import sendResponse from "../utils/send-response"
import HttpError from "../errors/http-error"
import RequestHandler from "./resuest-handler"
import  { TDbGetter, } from "../db/create-db"

export default class Server {
  server: HttpServer
  port: number
  requestHandler: RequestHandler
  getDb: TDbGetter

  constructor(port: number, getDb: TDbGetter) {
    this.server = createServer()
    this.port = port
    this.requestHandler = new RequestHandler([])
    this.getDb = getDb;
  }

  start() {
    this.server.listen(this.port)
    this.server.on("request", this.routeRequest.bind(this))
    this.server.on("connect", () => console.log("Connected"))
  }

  addRouter(newRouter: Router) {
    this.requestHandler.routers.push(newRouter)
  }

  async routeRequest(req: IncomingMessage, res: ServerResponse) {
    try {
      await this.requestHandler.handleRequest(req, res, this.getDb)
    } catch (err) {
      if (err instanceof HttpError) {
        sendResponse({ res, code: err.code, message: err.message })
      } else if (err instanceof Error) {
        sendResponse({ res, code: 500, message: err.message })
      } else {
        sendResponse({ res, code: 500, message: String(err) })
      }
    }
  }

  close() {
    this.server.close()
  }
}
