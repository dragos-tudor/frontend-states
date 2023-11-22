import { assertEquals, assertStrictEquals } from "/asserts.ts"
import { createAction } from "../../states-actions/mod.js"
import { createReducer, getReducers, setReducers, setReducer } from "../../states-reducers/mod.js"
import { createState, getStates, setStates, setState } from "../../states-states/mod.js"
import { runAction } from "./running.js"

Deno.test("change states => run actions", async (t) => {

  await t.step("change states reducer => run action => changed states", () => {
    const elem = {ownerDocument: {}}
    const action = createAction("state/reduce")
    setReducer(setReducers(elem), createReducer("state", {reduce: (state) => state + 2}))
    setState(setStates(elem), createState("state", 1))

    const actual = runAction(action, getReducers(elem), getStates(elem))
    assertEquals(actual["state"], 3)
  })

  await t.step("change states reducer with action payload => run action => changed states", () => {
    const elem = {ownerDocument: {}}
    const action = createAction("state/reduce", 2)
    setReducer(setReducers(elem), createReducer("state", {reduce: (state, action) => state + action.payload}))
    setState(setStates(elem), createState("state", 1))

    const actual = runAction(action, getReducers(elem), getStates(elem))
    assertEquals(actual["state"], 3)
  })

  await t.step("non-change states reducer => run action => unchanged states", () => {
    const elem = {ownerDocument: {}}
    const action = createAction("state/reduce")
    setReducer(setReducers(elem), createReducer("state", {reduce: (state) => state}))
    setState(setStates(elem), createState("state", 1))

    const actual = runAction(action, getReducers(elem), getStates(elem))
    assertStrictEquals(actual["state"], 1)
  })

})