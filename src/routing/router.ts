import Route from "./route"
import TCRUDMethod from "../types/crud-method"

export default class Router {
  basePath: string
  routes: Route[]

  constructor(basePath: string) {
    this.basePath = basePath
    this.routes = []
  }

  addRoute(newRoute: Route) {
    this.routes.push(newRoute)
  }

  match(path: string) {
    return path.startsWith(this.basePath)
  }

  findRoute(path: string, method: TCRUDMethod) {
    const restPath = path.slice(this.basePath.length)
    for (const route of this.routes) {
      const params = route.match(restPath, method)
      if (params) {
        return { route, params }
      }
    }
    return null
  }
}
