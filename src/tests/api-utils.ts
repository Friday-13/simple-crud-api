import { TDataBase } from "../db/create-db"
import { IUserData } from "../db/user-repository"
import getDb from "../utils/get-db"
import testUsers from "./test-users"

let db: TDataBase

export const loadTestUsers = async () => {
  db = await getDb()
  db.records = testUsers
}

export const getTestUser = (i: number = 3) => {
  const user = testUsers[i]
  if (user === undefined) throw new Error("Test user doesn't exist")
  return user
}

export const getTestUserData = (i: number = 3) => {
  const user = testUsers[i]
  if (user === undefined) throw new Error("Test user doesn't exist")

  const data: IUserData = {
    username: user.username,
    hobbies: user.hobbies,
    age: user.age,
  }
  return data
}
