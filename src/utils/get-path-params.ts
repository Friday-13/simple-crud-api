import PathParamsError from "../errors/path-param-error"

const getPathParams = (pattern: string, path: string) => {
  const params: Record<string, string> = {}

  const pathParts = path.split("/")
  const patternParts = pattern.split("/")

  if (pathParts.length !== patternParts.length) {
    throw new PathParamsError("Path and given pattern don't match")
  }

  for (let i = 0; i < pathParts.length; i += 1) {
    const pathPart = pathParts[i]
    const patternPart = patternParts[i]

    if (patternPart && pathPart && patternPart.startsWith("{")) {
      const paramName = patternPart.slice(0, -1)
      params[paramName] = pathPart
    } else if (patternPart !== pathPart) {
      throw new PathParamsError("Path and given pattern don't match")
    }
  }
  return params
}

export { getPathParams as default }
