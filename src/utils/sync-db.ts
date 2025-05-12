import { TDataBase } from "../db/create-db"
import { isWorker } from "./work-mode"

const syncDb = (db: TDataBase) => {
  if (isWorker() && process.send) {
    process.send({ db: db })
  }
}

export { syncDb as default }
