import { IncomingMessage, ServerResponse } from "node:http"
import HttpError from "../errors/http-error"
import { ISendResponse } from "../utils/send-response"
import TCRUDMethod from "../types/crud-method"
import PathParamsError from "../errors/path-param-error"
import getPathParams from "../utils/get-path-params"
type TRouteHandler = ({
  req,
  res,
  params,
}: {
  req: IncomingMessage
  res: ServerResponse
  params?: Record<string, string>
}) => Promise<ISendResponse> | ISendResponse

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

  async handler(
    req: IncomingMessage,
    res: ServerResponse,
    params: Record<string, string>
  ): Promise<ISendResponse> {
    try {
      const responseContent = await this.handlerCore({ req, res, params })
      return responseContent
    } catch (err) {
      if (err instanceof HttpError) {
        return { code: err.code, message: err.message, res: res }
      } else {
        throw err
      }
    }
  }

  match(testPath: string, testMethod: TCRUDMethod) {
    if (this.method !== testMethod) return false
    try {
      const params = getPathParams(this.path, testPath)
      return params
    } catch (err) {
      if (err instanceof PathParamsError) return false
      throw err
    }
  }
}
