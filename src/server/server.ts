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
    this.server.on("request", this.routeRequest.bind(this))
    this.server.on("connect", () => console.log("Connected"))
  }

  addRouter(newRouter: Router) {
    this.routers.push(newRouter)
  }

  async routeRequest(req: IncomingMessage, res: ServerResponse) {
    try {
      await this.handleRequest(req, res)
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

  async handleRequest(req: IncomingMessage, res: ServerResponse) {
    const path = req.url ? req.url : "/"
    const method = req.method?.toUpperCase() as TCRUDMethod | undefined

    if (!method) {
      throw new HttpError(405, "Method not allowed")
    }

    for (const router of this.routers) {
      if (!router.match(path)) continue

      const match = router.findRoute(path, method)

      if (match) {
        const { route, params } = match
        const responseContent = await route.handler(req, res, params)
        sendResponse(responseContent)
        return
      }
    }
    throw new HttpError(404, `Page not found for path ${path}`)
  }

  close() {
    this.server.close()
  }
}
