
export const getMiddleware = (middlewares, name) => middlewares.find(middleware => middleware.name === name)

export const getMiddlewares = (elem) => elem.ownerDocument.__middlewares