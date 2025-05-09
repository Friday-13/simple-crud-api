import { ServerResponse } from "node:http"

interface ISendResponse {
  res: ServerResponse
  code: number
  message: string
}

const sendResponse = ({ res, code, message }: ISendResponse) => {
  res.statusCode = code
  res.write(message)
  res.end()
}

export { sendResponse as default }
