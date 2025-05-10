import Route from "../routing/route"
import Router from "../routing/router"
import Server from "../server/server"
import getProcessArgs from "../utils/get-process-args"

export default class App {
  constructor() {}

  start() {
    const args = getProcessArgs()
    const mode = args.has("multi") ? "multi" : "single"
    let server;
    if (mode === "multi") {
      console.log("Multi mode");
    }
    {
      server = this.startSingleServer()
    }
    process.on("SIGINT", () => this.stop(server))
    process.on("exit", () => this.stop(server))
    process.on("SIGTERM", () => this.restart())
  }

  startSingleServer() {
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
    const postUsers = new Route({
      path: "/{id}",
      method: "POST",
      handlerCore: ({ res }) => {
        return { code: 201, message: "User posted", res: res }
      },
    })
    userRouter.addRoute(getUsers)
    userRouter.addRoute(postUsers)
    server.addRouter(testRouter)
    server.start()
    return server
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
