import DbError from "../errors/db-error"
import HttpError from "../errors/http-error"

const transformDbErrors = (err: Error) => {
  if (err instanceof DbError) {
    if (err.code === "idErr") return new HttpError(400, err.message)
    if (err.code === "inputErr") return new HttpError(400, err.message)
    if (err.code === "recErr") return new HttpError(404, err.message)
  }
}

export { transformDbErrors as default }
