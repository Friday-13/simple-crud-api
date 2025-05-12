import App from "../app/app"
import { TDataBase } from "../db/create-db"
import { IUser } from "../db/user-repository"
import getDb from "../utils/get-db"
import { getTestUserData } from "./api-utils"

let app: App
let db: TDataBase
let port: number
const baseUrl = "http://localhost"
process.env.PORT_NUMBER = '4001'
describe("Scenario 1", () => {
  beforeAll(() => {
    app = new App()
    app.start()
    port = app.server?.port || 4001
  })

  afterAll(async () => {
    app.stop()
    db = await getDb()
    db.records = []
  })

  test("GET /api/users -> []", async () => {
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    expect(data).toEqual([])
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

  test("GET /api/users -> IUser[]", async () => {
    const testUser = getTestUserData(2)
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = (await res.json()) as IUser[]
    expect(data.length).toBe(1)
    expect(data[0]).toEqual({
      id: expect.any(String),
      ...testUser,
    })
    expect(res.status).toBe(200)
  })

  test("DELETE /api/users/{id} -> 204", async () => {
    const resUser = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const dataUser = (await resUser.json()) as IUser[]
    const testUser = dataUser[0] as IUser

    const res = await fetch(`${baseUrl}:${port}/api/users/${testUser.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    expect(res.status).toBe(204)
  })

  test("GET /api/users -> []", async () => {
    const res = await fetch(`${baseUrl}:${port}/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    expect(data).toEqual([])
  })
})
