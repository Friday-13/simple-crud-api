import IBaseModel from "./ibase-model"
import RepositoryBase from "./repository-base"

export default class InMemoryDb<
  T extends Record<string, RepositoryBase<IBaseModel>>,
> {
  tables: T
  constructor(tables: T) {
    this.tables = tables
  }
  getTable<K extends keyof T>(name: K): T[K] {
    return this.tables[name]
  }
}
