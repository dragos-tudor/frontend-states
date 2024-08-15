import { splitActionType } from "../../states-actions/mod.js"

export const runAction = (action, reducers, states) =>
{
  const [stateName, reducerFuncName] = splitActionType(action.type)
  const state = states?.[stateName]
  const reducer = reducers?.[stateName]
  if(!reducer || !reducer[reducerFuncName]) return states

  const reducerFunc = reducer[reducerFuncName]
  const reducedState = reducerFunc(state, action)

  return state == reducedState?
    states:
    { ...states, [stateName]: reducedState}
}