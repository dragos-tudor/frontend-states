import { throwErrors } from "../../support-errors/mod.js"
import { getStates, getState, setStates, setState, validateState } from "../../states-states/mod.js"
import { getReducers, getReducer, setReducers, setReducer, validateReducer } from "../../states-reducers/mod.js"
import { getMiddlewares, getMiddleware, setMiddlewares, setMiddleware, validateMiddleware } from "../../states-middlewares/mod.js"

export const Store = (props, elem) =>
{
  const {reducer, state, middleware} = props
  getMiddlewares(elem) || setMiddlewares(elem)
  getReducers(elem) || setReducers(elem)
  getStates(elem) || setStates(elem)

  if(reducer) {
    throwErrors(validateReducer(reducer))
    if(!getReducer(getReducers(elem), reducer.name))
      setReducer(getReducers(elem), reducer)
  }
  if(state) {
    throwErrors(validateState(state))
    if(!getState(getStates(elem), state.name))
      setState(getStates(elem), state)
  }
  if(middleware) {
    throwErrors(validateMiddleware(middleware))
    if(!getMiddleware(getMiddlewares(elem), middleware.name))
     setMiddleware(getMiddlewares(elem), middleware)
  }

  return props.children
}