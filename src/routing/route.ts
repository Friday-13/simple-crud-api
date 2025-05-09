import { IncomingMessage, ServerResponse } from "node:http"
import HttpError from "../errors/http-error"
import sendResponse from "../utils/send-response"
type TCRUDMethod = "GET" | "POST" | "PUT" | "DELETE"
type TRouteHandler = (req: IncomingMessage, res: ServerResponse) => void

interface IRoute {
  path: string
  method: TCRUDMethod
  handlerCore: TRouteHandler
}
export default class Route {
  path: string
  method: TCRUDMethod
  handlerCore: TRouteHandler

  constructor({ path, method, handlerCore }: IRoute) {
    this.path = path
    this.method = method
    this.handlerCore = handlerCore
  }

  handler(req: IncomingMessage, res: ServerResponse) {
    try {
      this.handlerCore(req, res)
    } catch (err) {
      if (err instanceof HttpError) {
        sendResponse({
          res: res,
          code: err.code,
          message: err.message,
        })
      } else {
        throw err;
      }
    }
  }
}
