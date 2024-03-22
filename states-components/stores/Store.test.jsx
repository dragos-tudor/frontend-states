import { assertEquals, assertObjectMatch } from "/asserts.ts"
import { getEffects, render, useEffect, update } from "/rendering.js"
import { createAction } from "../../states-actions/mod.js"
import { createMiddleware, getMiddlewares } from "../../states-middlewares/mod.js"
import { createReducer, getReducers } from "../../states-reducers/mod.js"
import { createState, getStates } from "../../states-states/mod.js"
import { setSelectors, useSelector } from "../../states-selectors/mod.js"
import { dispatchAction } from "../../states/mod.js"
import { Store } from "./Store.js"

Deno.test("use global states => use stores", async (t) => {

  await t.step("multiple states => render store => merged states", () => {
    const elem = render(<Store state={createState("state1", 1)}><Store state={createState("state2", 2)}></Store></Store>)
    assertEquals(getStates(elem), {state1: 1, state2: 2})
  })

  await t.step("multiple reducers => render store => merged reducers", () => {
    const elem = render(<Store reducer={createReducer("state1", {redcue: console.log})}><Store reducer={createReducer("state2", {redcue: console.error})}></Store></Store>)
    assertEquals(getReducers(elem), {state1: {redcue: console.log}, state2: {redcue: console.error}})
  })

  await t.step("store with states => update store multiple times => states stored once", () => {
    const elem = render(<Store state={createState("state", 1)}></Store>)
    update(elem, <Store states={createState("state", 2)}></Store>)

    assertEquals(getStates(elem), {state: 1})
  })

  await t.step("store with reducers => update store multiple times => reducers stored once", () => {
    const elem = render(<Store reducer={createReducer("state", {redcue: console.log})}></Store>)
    update(elem, <Store reducer={createReducer("state", {redcue: console.error})}></Store>)

    assertEquals(getReducers(elem), {state: {redcue: console.log}})
  })

  await t.step("store with middleware => update store multiple times => middleware stored once", () => {
    const elem = render(<Store middleware={createMiddleware("m", console.log)}></Store>)
    update(elem, <Store middleware={createMiddleware("m", console.error)}></Store>)

    assertObjectMatch(getMiddlewares(elem)[0], {name: "m", func: console.log})
  })

  await t.step("store with states reducers and states selectors => dispatch action => selectors updated", async () => {
    const A = (_, elem) => {
      const globalStates = getStates(elem)
      const selectors = setSelectors(elem)
      const selectedValue = useSelector(selectors, "selector", states => states.state + 2, globalStates)

      return <>{selectedValue}</>
    }

    const elem = render(
      <Store
        state={createState("state", 1)}
        reducer={createReducer("state", {reduce: (state, action) => state + action.payload } )}>
          <A></A>
      </Store>)

    dispatchAction(elem, createAction("state/reduce", 3))
    assertEquals(elem.textContent, "6")
  })

})