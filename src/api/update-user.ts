import { IUserData } from "../db/user-repository"
import HttpError from "../errors/http-error"
import Route from "../routing/route"
import getRequestBody from "../utils/get-request-body"

const updateUser = new Route({
  path: "/{id}",
  method: "PUT",
  handlerCore: async ({ req, res, params, db }) => {
    if (!params) throw new HttpError(400, "Id required")
    const id = params["id"]

    const body = await getRequestBody(req)
    const userData = body as IUserData

    const user = db.update({ id, ...userData })
    return { code: 200, message: JSON.stringify(user), res: res }
  },
})

export { updateUser as default }
