import { createServer, Server } from "node:http"
export default class App {
  constructor() {}

  start() {
    const server = createServer((req, res) => {
      console.log(req.url)
      console.log(req.method)
      res.statusCode = 400
      res.write("")
      res.end()
    })

    server.listen(4000)
    server.on("connect", () => console.log("Connected"))
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
