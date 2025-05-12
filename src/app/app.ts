import { userRouter } from "../api/users"
import ClusterManager from "../cluster/cluster-manager"
import Server from "../server/server"
import { isMulti } from "../utils/work-mode"

export default class App {
  server: Server | undefined
  constructor() {}

  start() {
    if (isMulti()) {
      const cluster = new ClusterManager()
      cluster.start()
    } else {
      this.server = this.startSingleServer()
      process.on("SIGINT", () => this.stop())
      process.on("exit", () => this.stop())
      process.on("SIGTERM", () => this.restart())
    }
  }

  startSingleServer() {
    const port = Number(process.env.PORT_NUMBER) || 4000
    console.log(port)
    const server = new Server(port)
    server.addRouter(userRouter)
    server.start()
    return server
  }

  stop() {
    if (this.server) {
      this.server.close()
    }
    console.log("Server stopped")
  }

  restart() {
    console.log("Server restarting...")
    setTimeout(() => {
      console.log("Server restarted")
    }, 1000)
  }
}
