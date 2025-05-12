import { UserRepository } from "./user-repository"

const createInMemoryDb = () => {
  const users = new UserRepository()
  return users
}

export type TDataBase = ReturnType<typeof createInMemoryDb>

export { createInMemoryDb as default }
