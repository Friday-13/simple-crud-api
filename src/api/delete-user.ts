import HttpError from "../errors/http-error"
import Route from "../routing/route"

const deleteUser = new Route({
  path: "/{id}",
  method: "DELETE",
  handlerCore: async ({ res, params, db }) => {
    if (!params) throw new HttpError(400, "Id required")
    const id = params["id"]

    db.delete(id)
    return { code: 204, message: "OK", res: res }
  },
})

export { deleteUser as default }
