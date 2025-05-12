import App from "../app/app"
import { TDataBase } from "../db/create-db"
import { IUserData } from "../db/user-repository"
import getDb from "../utils/get-db"

let app: App
let db: TDataBase

describe("check jest config", () => {
  beforeEach(() => {
    app = new App()
    app.start()
  })

  afterEach(async () => {
    app.stop()
    db = await getDb();
    db.records = [];
  })

  test("GET api/users -> []", async () => {
    const res = await fetch("http://localhost:4000/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    expect(data).toEqual([])
  })

  test("POST api/users -> test user", async () => {
    const testUser: IUserData = {
      username: "Ivan",
      age: 45,
      hobbies: ["test hobbie", "test hobbies"],
    }
    const res = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser),
    })
    const data = await res.json()
    expect(data).toEqual({
      id: expect.any(String),
      username: testUser.username,
      age: testUser.age,
      hobbies: testUser.hobbies,
    })
  })
})
