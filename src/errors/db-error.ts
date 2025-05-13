type TdbErrorCode = "idErr" | "recErr" | "inputErr"
export default class DbError extends Error {
  code: TdbErrorCode
  constructor(code: TdbErrorCode, message: string) {
    super(message)
    this.code = code
  }
}
