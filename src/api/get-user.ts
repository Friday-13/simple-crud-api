import HttpError from "../errors/http-error"
import Route from "../routing/route"

const getUser = new Route({
  path: "/{id}",
  method: "GET",
  handlerCore: ({ res, db, params }) => {
    if (!params) throw new HttpError(400, "Id required")
    const id = params["id"]
    const user = db.getById(id)
    if (!user) throw new HttpError(404, `User with id ${id} doesn't exist`)
    return { code: 200, message: user, res: res }
  },
})

export { getUser as default }
