import { isMulti } from "../utils/work-mode"
import createInMemoryDb, { TDataBase } from "./create-db"

let db: TDataBase

if (!isMulti()) {
  db = createInMemoryDb()
}

export { db as default }
