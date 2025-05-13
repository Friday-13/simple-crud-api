import IPrimaryResponse from "../cluster/iprimary-response"
import createInMemoryDb, { TDataBase } from "../db/create-db"
import db from "../db/init-db"
import { isMulti, isWorker } from "./work-mode"

const getDb = async (): Promise<TDataBase> => {
  if (isMulti()) {
    if (!isWorker()) {
      return Promise.resolve(db)
    }
    const dbRequest = new Promise<TDataBase>((resolve, reject) => {
      if (process.send === undefined) {
        reject(new Error("Process hasn't spawned like a child"))
        return
      }
      process.send({ request: "getDb" })
      process.on("message", (message) => {
        try {
          const primaryResponse = message as IPrimaryResponse
          const records = primaryResponse.db
          const newDb = createInMemoryDb()
          newDb.records = records.records
          resolve(newDb)
        } catch (err) {
          reject(err)
        }
      })
    })
    return dbRequest
  }
  return Promise.resolve(db)
}

export { getDb as default }
