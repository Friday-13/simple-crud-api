import IBaseModel from "./ibase-model"

export default abstract class RepositoryBase<T extends IBaseModel> {
  records: Array<T>
  name: string

  constructor(name: string) {
    this.name = name
    this.records = []
  }

  getById(id: string) {
    return this.records.find((record) => record.id === id)
  }

  getAll() {
    return this.records
  }

  delete(id: string) {
    const userIndex = this.records.findIndex((record) => record.id === id)
    this.records.splice(userIndex, 1)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract update(data: any): T | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract create(data: any): T
}
