import IBaseModel from "./ibase-model"
import { v4 as uuidv4 } from "uuid"
import RepositoryBase from "./repository-base"
import DbError from "../errors/db-error"

export interface IUserData {
  username: string
  age: number
  hobbies: string[]
}

export interface IUser extends IUserData {
  id: string
}

export class UserModel implements IBaseModel {
  id: string
  username: string
  age: number
  hobbies: string[]

  constructor({ username, age, hobbies }: IUserData) {
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

  create(userData: IUserData) {
    this.validateUser(userData)
    const user = new UserModel(userData)
    this.records.push(user)
    return user
  }

  update(userData: Partial<IUser>) {
    this.validateUserWithId(userData)
    const user = this.getById(userData.id)
    if (!user)
      throw new DbError("recErr", `User with ID ${userData.id} does not exist.`)
    user.username = userData.username
    user.age = userData.age
    user.hobbies = userData.hobbies
    return user
  }

  validateUsername(username?: string): asserts username is string {
    if (username === undefined)
      throw new DbError("inputErr", "Username must be defined")
    if (username.length <= 3)
      throw new DbError("inputErr", "Username must be longer than 3 characters")
  }

  validateAge(age?: number): asserts age is number {
    if (age === undefined || isNaN(age))
      throw new DbError("inputErr", "Age must be a number")
    if (age < 0) throw new DbError("inputErr", "Age cannot be negative")
    if (age > 120)
      throw new DbError("inputErr", "Age cannot be greater than 120")
  }

  validateHobbies(hobbies?: string[]): asserts hobbies is string[] {
    if (hobbies === undefined)
      throw new DbError("inputErr", "Hobbies must be defined")
    if (!Array.isArray(hobbies))
      throw new DbError("inputErr", "Hobbies must be array of string")
    if (!hobbies.every((hobbie) => typeof hobbie === "string"))
      throw new DbError("inputErr", "Hobbies must be array of string")
  }

  validateUser(user: Partial<IUser>): asserts user is IUserData {
    this.validateUsername(user.username)
    this.validateAge(user.age)
    this.validateHobbies(user.hobbies)
  }
  validateUserWithId(user: Partial<IUser>): asserts user is IUser {
    this.validateId(user.id)
    this.validateUser(user)
  }
}
