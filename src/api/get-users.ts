import Route from "../routing/route"

const getUsers = new Route({
  path: "",
  method: "GET",
  handlerCore: ({ res, db }) => {
    const users = db.getAll()
    return { code: 200, message: users, res: res }
  },
})

export { getUsers as default }
