import { ServerResponse } from "node:http"

export interface ISendResponse {
  res: ServerResponse
  code: number
  message: unknown
}

const sendResponse = ({ res, code, message }: ISendResponse) => {
  res.statusCode = code
  res.setHeader("Content-Type", "application/json")
  res.write(JSON.stringify(message))
  res.end()
}

export { sendResponse as default }
