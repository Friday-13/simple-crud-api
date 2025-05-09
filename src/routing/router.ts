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
    if (path.startsWith(this.basePath)) {
      return true
    }
    return false
  }

  findRoute(path: string, method: TCRUDMethod) {
    return this.routes.find(
      (route) => this.basePath + route.path === path && route.method === method
    )
  }
}
