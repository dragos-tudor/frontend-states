
export const setMiddleware = (middlewares, middleware) => (middlewares.push(middleware), middleware)

export const setMiddlewares = (elem, middlewares = []) => elem.ownerDocument.__middlewares = middlewares