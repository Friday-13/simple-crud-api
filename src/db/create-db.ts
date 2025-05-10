import InMemoryDb, { UserRepository } from "./in-memory-db"

const createInMemoryDb = () => {
  const users = new UserRepository()
  const db = new InMemoryDb({
    [`${users.name}`]: users,
  })

  return db
}

export { createInMemoryDb as default }
