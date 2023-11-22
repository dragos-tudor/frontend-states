import { MiddlewareType } from "./creating.js"

export const isFunctionMiddlewareFunc = (middleware) => typeof middleware.func === "function"

export const isMiddlewareType = (middleware) => middleware.$type === MiddlewareType

export const isStringMiddlewareName = (middleware) => typeof middleware.name === "string"
