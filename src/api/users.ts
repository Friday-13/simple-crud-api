import { IUser, IUserData } from "../db/user-repository"
import HttpError from "../errors/http-error"
import Route from "../routing/route"
import Router from "../routing/router"
import getRequestBody from "../utils/get-request-body"

export const userRouter = new Router("/users")

const getUsers = new Route({
  path: "",
  method: "GET",
  handlerCore: ({ res, db }) => {
    const users = db.getTable("users").getAll()
    return { code: 200, message: JSON.stringify(users), res: res }
  },
})

const getUser = new Route({
  path: "/{id}",
  method: "GET",
  handlerCore: ({ res, db, params }) => {
    if (!params) throw new HttpError(400, "Id required")
    const id = params["id"]
    const user = db.getTable("users").getById(id)
    return { code: 201, message: JSON.stringify(user), res: res }
  },
})

const createUser = new Route({
  path: "",
  method: "POST",
  handlerCore: async ({ req, res, db }) => {
    const body = await getRequestBody(req)
    const userData = body as IUserData
    const user = db.getTable("users").create(userData)
    return { code: 201, message: JSON.stringify(user), res: res }
  },
})

const updateUser = new Route({
  path: "/{id}",
  method: "POST",
  handlerCore: async ({ req, res, params, db }) => {
    if (!params) throw new HttpError(400, "Id required")
    const id = params["id"]

    const body = await getRequestBody(req)
    const userData = body as IUserData

    const user = db.getTable("users").update({ id, ...userData })
    return { code: 201, message: JSON.stringify(user), res: res }
  },
})

userRouter.addRoute(getUsers)
userRouter.addRoute(getUser)
userRouter.addRoute(createUser)
userRouter.addRoute(updateUser)
