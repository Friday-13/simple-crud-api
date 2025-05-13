export default class PathParamsError extends Error {
  code: string

  constructor(message: string) {
    super(message)
    this.code = "PathParamsError"
  }
}
