import { isFunctionMiddlewareFunc, isMiddlewareType, isStringMiddlewareName } from "./verifying.js"


const validateMiddlewareFunc = (middleware) => isFunctionMiddlewareFunc(middleware)? "": "Middleware func should be function."

const validateMiddlewareName = (middleware) => isStringMiddlewareName(middleware)? "": "Middleware name should be string."

const validateMiddlewareType = (middleware) => isMiddlewareType(middleware)? "": "Middleware type should be middleware [use createMiddleware]."

export const validateMiddleware = (middleware) => [
  validateMiddlewareType(middleware),
  validateMiddlewareName(middleware),
  validateMiddlewareFunc(middleware)
]
.filter(error => error)