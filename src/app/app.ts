import { userRouter } from "../api/users"
import createInMemoryDb from "../db/create-db"
import Server from "../server/server"
import getProcessArgs from "../utils/get-process-args"

export default class App {
  constructor() {}

  start() {
    const args = getProcessArgs()
    const mode = args.has("multi") ? "multi" : "single"
    let server
    if (mode === "multi") {
      console.log("Multi mode")
    }
    {
      server = this.startSingleServer()
    }
    process.on("SIGINT", () => this.stop(server))
    process.on("exit", () => this.stop(server))
    process.on("SIGTERM", () => this.restart())
  }

  startSingleServer() {
    const db = createInMemoryDb()
    const server = new Server(4000, () => Promise.resolve(db))
    server.addRouter(userRouter)
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
