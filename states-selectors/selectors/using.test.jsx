import { assertEquals } from "/asserts.ts"
import { render } from "/rendering.js"
import { useSelector } from "./using.js"
import { createState } from "../../states-states/mod.js";
import { setSelectors } from "./setting.js";


Deno.test("use global states => use selectors", async (t) => {

  await t.step("state selector => use selector => selector with state based value", () => {
    const func = state => state.data
    const elem = render(<a></a>)
    const selectors = setSelectors(elem)
    const value = useSelector(selectors, "a", func, createState("x", 1))

    assertEquals(selectors["a"], {name: "a", func, value: 1})
    assertEquals(value, 1)
  })

  await t.step("state selector => use selector twice => selector with second state based value", () => {
    const elem = render(<a></a>)
    const selectors = setSelectors(elem)
    const func = state => state.data
    useSelector(selectors, "a", func, createState("x", 1))
    useSelector(selectors, "a", func, createState("x", 2))

    assertEquals(selectors["a"], {name: "a", func, value: 2})
  })

})