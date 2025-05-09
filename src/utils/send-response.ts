import { ServerResponse } from "node:http"

export interface ISendResponse {
  res: ServerResponse
  code: number
  message: string
}

const sendResponse = ({ res, code, message }: ISendResponse) => {
  res.statusCode = code
  res.setHeader("Content-Type", "application/json")
  res.write(message)
  res.end()
}

export { sendResponse as default }
