import InMemoryDb from "./in-memory-db"
import { UserRepository } from "./user-repository"

const createInMemoryDb = () => {
  const users = new UserRepository()
  const db = new InMemoryDb({
    [`${users.name}`]: users,
  })

  return db
}

export type TDataBase = ReturnType<typeof createInMemoryDb>
export type TDbPromise = Promise<TDataBase>
export type TDbGetter = () => TDbPromise

export { createInMemoryDb as default }
