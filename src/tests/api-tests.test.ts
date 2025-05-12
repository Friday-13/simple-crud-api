import App from "../app/app"
import { TDataBase } from "../db/create-db"
import { IUser, IUserData } from "../db/user-repository"
import getDb from "../utils/get-db"
import testUsers from "./test-users"
import { v4 as uuidv4 } from "uuid"

let app: App
let db: TDataBase
let port: number
const baseUrl = "http://localhost"

describe("check jest config", () => {
  beforeEach(() => {
    app = new App()
    app.start()
    port = app.server?.port || 4000
  })

  afterEach(async () => {
    app.stop()
    db = await getDb()
    db.records = []
  })

  const loadTestUsers = async () => {
    db = await getDb()
    db.records = testUsers
  }

  const getTestUser = (i: number = 3) => {
    const user = testUsers[i]
    if (user === undefined) throw new Error("Test user doesn't exist")
    return user
  }

  const getTestUserData = (i: number = 3) => {
    const user = testUsers[i]
    if (user === undefined) throw new Error("Test user doesn't exist")

    const data: IUserData = {
      username: user.username,
      hobbies: user.hobbies,
      age: user.age,
    }
    return data
  }
  test("GET api/users -> []", async () => {
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    expect(data).toEqual([])
    expect(res.status).toEqual(200)
  })

  test("GET api/users -> IUser[]", async () => {
    await loadTestUsers()
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = (await res.json()) as IUser[]
    expect(data.length).toBe(testUsers.length)
    expect(data[0]).toEqual(testUsers[0])
    expect(res.status).toEqual(200)
  })

  test("GET api/users/{id} -> IUser", async () => {
    await loadTestUsers()
    const userIndex = 3
    const testUser = getTestUser(userIndex)
    const res = await fetch(`${baseUrl}:${port}/api/users/${testUser.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = (await res.json()) as IUser
    expect(data).toEqual(testUser)
    expect(res.status).toEqual(200)
  })

  test("GET api/users/{invalid-id} -> 400 error", async () => {
    await loadTestUsers()
    const invalidId = "invalid-id"
    const res = await fetch(`${baseUrl}:${port}/api/users/${invalidId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    expect(res.status).toEqual(400)
  })

  test("GET api/users/{non-existent id} -> 404 error", async () => {
    await loadTestUsers()
    const newUid = uuidv4()
    const res = await fetch(`${baseUrl}:${port}/api/users/${newUid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    expect(res.status).toEqual(404)
  })

  test("POST api/users -> test user", async () => {
    const testUser = getTestUserData()
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser),
    })
    const data = await res.json()
    expect(data).toEqual({
      id: expect.any(String),
      ...testUser,
    })
  })

  test("POST api/users (with invalid data)-> 400 error", async () => {
    const testUser = getTestUserData()
    const invalidUser: Partial<IUserData> = {
      username: testUser.username
    }
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidUser),
    })
    expect(res.status).toEqual(400)
  })

  test("POST api/users (with invalid data)-> 400 error", async () => {
    const testUser = getTestUserData()
    const invalidUser: Partial<IUserData> = {
      username: testUser.username
    }
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidUser),
    })
    expect(res.status).toEqual(400)
  })
})
