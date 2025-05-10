import { argv } from "node:process"

const getProcessArgs = () => {
  const args = new Map();
  argv.slice(2).forEach((currentArg) => {
    if (currentArg.startsWith("--")) {
      const [key, value] = currentArg.slice(2).split("=")
      args.set(key, value)
    }
  })
  return args
}

export { getProcessArgs as default }
