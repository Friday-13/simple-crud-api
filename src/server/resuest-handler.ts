import { TDbGetter } from "../db/create-db"
import HttpError from "../errors/http-error"
import Router from "../routing/router"
import TCRUDMethod from "../types/crud-method"
import sendResponse from "../utils/send-response"
import { IncomingMessage, ServerResponse } from "node:http"

export default class RequestHandler {
  routers: Router[]
  constructor(routers: Router[]) {
    this.routers = routers
  }

  async handleRequest(req: IncomingMessage, res: ServerResponse, getDb: TDbGetter) {
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
        const db = await getDb();
        const responseContent = await route.handler(req, res, params, db)
        sendResponse(responseContent)
        return
      }
    }
    throw new HttpError(404, `Page not found for path ${path}`)
  }
}
