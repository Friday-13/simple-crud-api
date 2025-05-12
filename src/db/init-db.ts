import { isMulti, isWorker } from "../utils/work-mode"
import createInMemoryDb, { TDataBase } from "./create-db"

let db: TDataBase

if (!isMulti()) {
  db = createInMemoryDb()
}

if (isMulti() && !isWorker()) {
  db = createInMemoryDb()
}

export { db as default }
