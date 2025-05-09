import Route from "../routing/route"
import Router from "../routing/router"
import Server from "../server/server"

export default class App {
  constructor() {}

  start() {
    const server = new Server(4000)
    const userRouter = new Router("/users")
    const testRouter = new Router("/tests")
    server.addRouter(userRouter)
    const getUsers = new Route({
      path: "",
      method: "GET",
      handlerCore: ({ res }) => {
        return { code: 200, message: "Users list", res: res }
      },
    })
    userRouter.addRoute(getUsers)
    server.addRouter(testRouter)
    server.start()
    process.on("SIGINT", () => this.stop(server))
    process.on("exit", () => this.stop(server))
    process.on("SIGTERM", () => this.restart())
  }

  stop(server: Server) {
    server.close()
    console.log("Server stopped")
  }

  restart() {
    console.log("Server restarting...")
    setTimeout(() => {
      console.log("Server restarted")
    }, 1000)
  }
}
