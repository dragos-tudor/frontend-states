import { assertEquals, assertThrows } from "/asserts.ts"
import { render, unrender } from "/rendering.js"
import { spy, assertSpyCallArgs } from "/mock.ts"
import { createAction } from "../../states-actions/mod.js"
import { createReducer, setReducers, setReducer } from "../../states-reducers/mod.js"
import { createState, setStates, setState, getStates as getGlobalStates } from "../../states-states/mod.js"
import { getSelectors, setSelectors, useSelector } from "../../states-selectors/mod.js"
import { createMiddleware, getMiddlewares, setMiddlewares, setMiddleware } from "../../states-middlewares/mod.js"
import { dispatchAction } from "./dispatching.js"

Deno.test("propagate changed states => dispatch actions", async (t) => {

  await t.step("modifying states reducers and selectors => dispatch action => elems updated", () => {
    const elem = render(<a><b></b></a>)
    setState(setStates(elem), createState("state", 1))
    setReducer(setReducers(elem), createReducer("state", {reduce: (state) => state + 1}))
    useSelector(setSelectors(elem.querySelector("b")), "", (states) => states.state + 1, getGlobalStates(elem))

    const actual = dispatchAction(elem, createAction("state/reduce"))
    assertEquals(actual.map(e => e.tagName), ["B"])
  })

  await t.step("modifying states reducers and selectors => dispatch action => selectors updated", () => {
    const B = (_, elem) => {
      const selectors = setSelectors(elem)
      const states = getGlobalStates(elem)
      useSelector(selectors, "", (states) => states?.state + 1, states)
      return <></>
    }
    const elem = render(<a><B></B></a>)
    setState(setStates(elem), createState("state", 1))
    setReducer(setReducers(elem), createReducer("state", {reduce: (state) => state + 1}))

    dispatchAction(elem, createAction("state/reduce"))
    assertEquals(getSelectors(elem.querySelector("b"))[""].value, 3)
  })

  await t.step("non-modifying states reducers => dispatch action => no elems updated", () => {
    const elem = render(<a></a>)
    setState(setStates(elem), createState("state", 1))
    setReducer(setReducers(elem), createReducer("state", {reduce: (state) => state}))
    useSelector(setSelectors(elem), "", (states) => states.state + 1, getGlobalStates(elem))

    const actual = dispatchAction(elem, createAction("state/reduce"))
    assertEquals(actual.map(e => e.tagName), [])
  })

  await t.step("non-modifying elems selectors => dispatch action => no elems updated", () => {
    const elem = render(<a></a>)
    setState(setStates(elem), createState("state", 1))
    setReducer(setReducers(elem), createReducer("state", {reduce: (state) => state + 1}))
    useSelector(setSelectors(elem), "", (_) => 1, getGlobalStates(elem))

    const actual = dispatchAction(elem, createAction("state/reduce"))
    assertEquals(actual.map(e => e.tagName), [])
  })

  await t.step("remove elems with selectors => dispatch action => no elems updated", () => {
    const elem = render(<a></a>)
    const parent = elem.parentElement
    setState(setStates(elem), createState("state", 1))
    setReducer(setReducers(elem), createReducer("state", {reduce: (state) => state + 1}))
    useSelector(setSelectors(elem), "", (states) => states.state + 1, getGlobalStates(elem))
    unrender(elem)

    const actual = dispatchAction(parent, createAction("state/reduce"))
    assertEquals(actual.map(e => e.tagName), [])
  })

  await t.step("actions middlewares => dispatch action => action through middlewares", () => {
    const elem = render(<a></a>)
    const spyMiddlewares = spy(() => {})
    setMiddleware(setMiddlewares(elem), createMiddleware("a", (next) => (action) => { spyMiddlewares("a"); return next(action) }))
    setMiddleware(getMiddlewares(elem), createMiddleware("b", (next) => (action) => { spyMiddlewares("b"); return next(action) }))

    const actual = dispatchAction(elem, createAction("state/reduce"))
    assertSpyCallArgs(spyMiddlewares, 0, ["a"])
    assertSpyCallArgs(spyMiddlewares, 1, ["b"])
  })

  await t.step("invalid action => dispatch action => throw action error", () => {
    assertThrows(() => dispatchAction(render(<a></a>), {type: "a/b"}), Error, "Action type should be action [use createAction].")
  })

})