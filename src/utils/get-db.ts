import db from "../db/init-db"
import { isMulti, isWorker } from "./work-mode"

const getDb = async () => {
  if (isMulti()) {
    if (!isWorker()) {
      return Promise.resolve(db)
    }
    //TODO: add fetching db from main process
    throw new Error("Multi mode hasn't relised")
  }
  return Promise.resolve(db)
}

export { getDb as default }
