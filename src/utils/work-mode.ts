import getProcessArgs from "./get-process-args"
import cluster from "node:cluster"

export const isMulti = () => {
  const args = getProcessArgs()
  return args.has("multi")
}

export const isWorker = () => {
  return cluster.isWorker
}
