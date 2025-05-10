import { IncomingMessage } from "node:http"
const getRequestBody = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = ""
    req.on("data", (chunk) => (body += chunk))
    req.on("end", () => {
      try {
        const json = JSON.parse(body)
        resolve(json)
      } catch {
        reject(new Error("Invalid JSON"))
      }
    })
    req.on("error", (err) => reject(err))
  })
}

export { getRequestBody as default }
