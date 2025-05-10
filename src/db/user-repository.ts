import IBaseModel from "./ibase-model"
import { v4 as uuidv4 } from "uuid"
import RepositoryBase from "./repository-base"

interface ICreateUser {
  username: string
  age: number
  hobbies: string[]
}

interface IUpdateUser {
  id: string
  username?: string
  age?: number
  hobbies?: string[]
}

export class UserModel implements IBaseModel {
  id: string
  username: string
  age: number
  hobbies: string[]

  constructor({ username, age, hobbies }: ICreateUser) {
    this.id = uuidv4()
    this.username = username
    this.age = age
    this.hobbies = hobbies
  }
}

export class UserRepository extends RepositoryBase<UserModel> {
  constructor() {
    super("users")
  }

  create({ username, age, hobbies }: ICreateUser) {
    const user = new UserModel({ username, age, hobbies })
    this.records.push(user)
    return user
  }

  update({ id, username, age, hobbies }: IUpdateUser) {
    const user = this.getById(id)
    if (user) {
      if (username) user.username = username
      if (age) user.age = age
      if (hobbies) user.hobbies = hobbies
      return user
    }
    return null
  }
}
