import { assertEquals } from "/asserts.ts"
import { createMiddleware } from "./creating.js"
import { chainMiddlewares } from "./chaining.js"

Deno.test("use states actions middlewares => chain middlewares", async (t) => {

  await t.step("middlewares => send data through chained middlewares => last middleware response", async () => {
    const middleware1 = createMiddleware("1", (next) => (data) => next(data + "b"))
    const middleware2 = createMiddleware("2", (next) => (data) => next(data + "c"))
    const middlewaresChain = chainMiddlewares([middleware1, middleware2], (data) => data + "d")

    const actual = await middlewaresChain("a")
    assertEquals(actual, "abcd")
  })

})