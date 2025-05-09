import {
  createServer,
  Server as HttpServer,
  IncomingMessage,
  ServerResponse,
} from "node:http"
import Router from "../routing/router"
import sendResponse from "../utils/send-response"
import HttpError from "../errors/http-error"
import TCRUDMethod from "../types/crud-method"

export default class Server {
  routers: Router[]
  server: HttpServer
  port: number

  constructor(port: number) {
    this.routers = []
    this.server = createServer()
    this.port = port
  }

  start() {
    this.server.listen(this.port)
    this.server.on("request", (req, res) => {
      this.routeRequest(req, res)
    })
    this.server.on("connect", () => console.log("Connected"))
  }

  addRouter(newRouter: Router) {
    this.routers.push(newRouter)
  }

  routeRequest(req: IncomingMessage, res: ServerResponse) {
    const path = req.url ? req.url : "/"
    const method = req.method as TCRUDMethod | undefined
    if (!method) {
      throw new HttpError(405, "Method empty")
    }
    const matchedRouter = this.routers.find((router) => router.match(path))
    const matchedRoute = matchedRouter?.findRoute(path, method)
    const responseContent = matchedRoute?.handler(req, res)
    if (responseContent) {
      sendResponse(responseContent)
    } else {
      sendResponse({ res: res, code: 404, message: "Page not found" })
    }
  }

  close() {
    this.server.close()
  }
}
