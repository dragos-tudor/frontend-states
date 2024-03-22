import { MiddlewareType } from "./creating.js"
import { getMiddleware } from "./getting.js";

export const existsMiddleware = (middlewares, name) => !!getMiddleware(middlewares, name)

export const isFunctionMiddlewareFunc = (middleware) => typeof middleware.func === "function"

export const isMiddlewareType = (middleware) => middleware.$type === MiddlewareType

export const isStringMiddlewareName = (middleware) => typeof middleware.name === "string"
