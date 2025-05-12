import { IncomingMessage, ServerResponse } from "node:http"
import { ISendResponse } from "../utils/send-response"
import TCRUDMethod from "../types/crud-method"
import PathParamsError from "../errors/path-param-error"
import getPathParams from "../utils/get-path-params"
import { TDataBase } from "../db/create-db"
import DbError from "../errors/db-error"
import transformDbErrors from "../utils/transform-db-errors"
import getDb from "../utils/get-db"
import syncDb from "../utils/sync-db"

interface IRoutehandler {
  req: IncomingMessage
  res: ServerResponse
  params?: Record<string, string>
  db: TDataBase
}

type TRouteHandler = (
  params: IRoutehandler
) => Promise<ISendResponse> | ISendResponse

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
      const db = await getDb()
      const responseContent = await this.handlerCore({ req, res, params, db })
      syncDb(db)
      return responseContent
    } catch (err) {
      if (err instanceof DbError) {
        throw transformDbErrors(err)
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
