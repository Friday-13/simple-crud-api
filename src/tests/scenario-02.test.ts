import App from "../app/app"
import { TDataBase } from "../db/create-db"
import { IUser } from "../db/user-repository"
import getDb from "../utils/get-db"
import { getTestUserData } from "./api-utils"
import { v4 as uuidv4 } from "uuid"

let app: App
let db: TDataBase
let port: number
const baseUrl = "http://localhost"
process.env.PORT_NUMBER = "4002"
describe("Scenario 2", () => {
  beforeAll(() => {
    app = new App()
    app.start()
    port = app.server?.port || 4002
  })

  afterAll(async () => {
    app.stop()
    db = await getDb()
    db.records = []
  })

  test("POST /api/users -> test user", async () => {
    const testUser = getTestUserData(2)
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
  test("POST /api/users -> test user", async () => {
    const testUser = getTestUserData(3)
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

  test("GET /api/users -> IUser[]", async () => {
    const testUser1 = getTestUserData(2)
    const testUser2 = getTestUserData(3)
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = (await res.json()) as IUser[]
    expect(data[0]).toEqual({
      id: expect.any(String),
      ...testUser1,
    })
    expect(data[1]).toEqual({
      id: expect.any(String),
      ...testUser2,
    })
  })
  test("DELETE /api/users/{non-existent id} -> 404 error", async () => {
    const newUid = uuidv4()
    const res = await fetch(`${baseUrl}:${port}/api/users/${newUid}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    expect(res.status).toBe(404)
  })
  test("GET /api/users -> IUser[]", async () => {
    const testUser1 = getTestUserData(2)
    const testUser2 = getTestUserData(3)
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = (await res.json()) as IUser[]
    expect(data[0]).toEqual({
      id: expect.any(String),
      ...testUser1,
    })
    expect(data[1]).toEqual({
      id: expect.any(String),
      ...testUser2,
    })
  })
})
