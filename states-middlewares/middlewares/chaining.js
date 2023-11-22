
export const chainMiddlewares = (middlewares, lastMiddleware) =>
  middlewares
    .map(middleware => middleware.func)
    .reverse()
    .reduce((chain, func) => func(chain), lastMiddleware)