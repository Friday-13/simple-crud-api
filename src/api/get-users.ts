import Route from "../routing/route"

const getUsers = new Route({
  path: "",
  method: "GET",
  handlerCore: ({ res, db }) => {
    const users = db.getTable("users").getAll()
    return { code: 200, message: JSON.stringify(users), res: res }
  },
})

export { getUsers as default }
