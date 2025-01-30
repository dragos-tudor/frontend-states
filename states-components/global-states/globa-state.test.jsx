import { assertEquals, assertObjectMatch } from "/asserts.ts"
import { registerLinkeDomParser, render, update } from "/rendering.js"
import { createAction } from "../../states-actions/mod.js"
import { createMiddleware, getMiddlewares } from "../../states-middlewares/mod.js"
import { createReducer, getReducers } from "../../states-reducers/mod.js"
import { createState, getStates } from "../../states-states/mod.js"
import { setSelectors, useSelector } from "../../states-selectors/mod.js"
import { dispatchAction } from "../../states/mod.js"
import { Global_State } from "./global-state.js"

await registerLinkeDomParser()

Deno.test("use global states => use global states", async (t) => {

  await t.step("multiple states => render global state => merged states", () => {
    const elem = render(<Global_State state={createState("state1", 1)}><Global_State state={createState("state2", 2)}></Global_State></Global_State>)
    assertEquals(getStates(elem), {state1: 1, state2: 2})
  })

  await t.step("multiple reducers => render global state => merged reducers", () => {
    const elem = render(<Global_State reducer={createReducer("state1", {redcue: console.log})}><Global_State reducer={createReducer("state2", {redcue: console.error})}></Global_State></Global_State>)
    assertEquals(getReducers(elem), {state1: {redcue: console.log}, state2: {redcue: console.error}})
  })

  await t.step("globalState with states => update global state multiple times => states globalStated once", () => {
    const elem = render(<Global_State state={createState("state", 1)}></Global_State>)
    update(elem, <Global_State states={createState("state", 2)}></Global_State>)

    assertEquals(getStates(elem), {state: 1})
  })

  await t.step("globalState with reducers => update global state multiple times => reducers globalStated once", () => {
    const elem = render(<Global_State reducer={createReducer("state", {redcue: console.log})}></Global_State>)
    update(elem, <Global_State reducer={createReducer("state", {redcue: console.error})}></Global_State>)

    assertEquals(getReducers(elem), {state: {redcue: console.log}})
  })

  await t.step("globalState with middleware => update global state multiple times => middleware globalStated once", () => {
    const elem = render(<Global_State middleware={createMiddleware("m", console.log)}></Global_State>)
    update(elem, <Global_State middleware={createMiddleware("m", console.error)}></Global_State>)

    assertObjectMatch(getMiddlewares(elem)[0], {name: "m", func: console.log})
  })

  await t.step("globalState with states reducers and states selectors => dispatch action => selectors updated", () => {
    const A = (_, elem) => {
      const states = getStates(elem)
      const selectors = setSelectors(elem)
      const selectedValue = useSelector(selectors, "selector", states => states.state + 2, states)

      return <>{selectedValue}</>
    }

    const elem = render(
      <app>
        <Global_State
          state={createState("state", 1)}
          reducer={createReducer("state", {reduce: (state, action) => state + action.payload } )}>
        </Global_State>
        <A></A>
      </app>)

    dispatchAction(elem, createAction("state/reduce", 3))
    assertEquals(elem.textContent, "6")
  })

})