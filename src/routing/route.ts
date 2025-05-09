import { IncomingMessage, ServerResponse } from "node:http"
import HttpError from "../errors/http-error"
import { ISendResponse } from "../utils/send-response"
import TCRUDMethod from "../types/crud-method"
type TRouteHandler = ({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse
}) => ISendResponse

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

  handler(req: IncomingMessage, res: ServerResponse): ISendResponse {
    try {
      const responseContent = this.handlerCore({ req, res })
      return responseContent
    } catch (err) {
      if (err instanceof HttpError) {
        return { code: err.code, message: err.message, res: res }
      } else {
        throw err
      }
    }
  }

  // match(testPath: string, testMethod: TCRUDMethod) {}
}
