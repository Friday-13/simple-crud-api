import Router from "../routing/router"
import createUser from "./create-user"
import deleteUser from "./delete-user"
import getUser from "./get-user"
import getUsers from "./get-users"
import updateUser from "./update-user"

export const userRouter = new Router("/api/users")

userRouter.addRoute(getUsers)
userRouter.addRoute(getUser)
userRouter.addRoute(createUser)
userRouter.addRoute(updateUser)
userRouter.addRoute(deleteUser)
