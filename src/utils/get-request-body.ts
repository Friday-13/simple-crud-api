import { IncomingMessage } from "node:http"
import HttpError from "../errors/http-error"
const getRequestBody = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = ""
    req.on("data", (chunk) => (body += chunk))
    req.on("end", () => {
      if (body === "") {
        resolve(undefined)
        return
      }
      try {
        const json = JSON.parse(body)
        resolve(json)
      } catch {
        reject(new HttpError(400, "Invalid JSON"))
      }
    })
    req.on("error", (err) => reject(err))
  })
}

export { getRequestBody as default }
