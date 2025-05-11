import { IUserData } from "../db/user-repository"
import Route from "../routing/route"
import getRequestBody from "../utils/get-request-body"

const createUser = new Route({
  path: "",
  method: "POST",
  handlerCore: async ({ req, res, db }) => {
    const body = await getRequestBody(req)
    const userData = body as IUserData
    const user = db.create(userData)
    return { code: 201, message: JSON.stringify(user), res: res }
  },
})

export { createUser as default }
