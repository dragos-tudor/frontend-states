
export const MiddlewareType = Symbol("middleware")

export const createMiddleware = (name, func) => Object.freeze({
  name, func, $type: MiddlewareType
})