import DbError from "../errors/db-error"
import IBaseModel from "./ibase-model"
import { validate } from "uuid"

export default abstract class RepositoryBase<T extends IBaseModel> {
  records: Array<T>
  name: string

  constructor(name: string) {
    this.name = name
    this.records = []
  }

  getById(id?: string) {
    this.validateId(id)
    return this.records.find((record) => record.id === id) || null
  }

  getAll() {
    return this.records
  }

  delete(id?: string) {
    this.validateId(id)
    const recordIndex = this.records.findIndex((record) => record.id === id)
    if (recordIndex === -1)
      throw new DbError("recErr", `ID ${id} doesn't exist`)
    this.records.splice(recordIndex, 1)
    return true
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract update(data: any): T | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract create(data: any): T

  validateId(id?: string): asserts id is string {
    if (!validate(id)) {
      throw new DbError("idErr", `Invalid id ${id}`)
    }
  }
}
