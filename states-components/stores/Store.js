import { getStates, existsState, setStates, setState, validateState } from "../../states-states/mod.js"
import { getReducers, existsReducer, setReducers, setReducer, validateReducer } from "../../states-reducers/mod.js"
import { getMiddlewares, existsMiddleware, setMiddlewares, setMiddleware, validateMiddleware } from "../../states-middlewares/mod.js"
import { throwErrors } from "../../states-selectors/mod.js"

export const Store = (props, elem) =>
{
  const {reducer, state, middleware} = props
  const middlewares = getMiddlewares(elem) || setMiddlewares(elem)
  const reducers = getReducers(elem) || setReducers(elem)
  const states = getStates(elem) || setStates(elem)

  if(reducer) {
    throwErrors(validateReducer(reducer))
    existsReducer(reducers, reducer.name) ||
      setReducer(reducers, reducer)
  }
  if(state) {
    throwErrors(validateState(state))
    existsState(states, state.name) ||
      setState(states, state)
  }
  if(middleware) {
    throwErrors(validateMiddleware(middleware))
    existsMiddleware(middlewares, middleware.name) ||
     setMiddleware(middlewares, middleware)
  }

  return props.children
}