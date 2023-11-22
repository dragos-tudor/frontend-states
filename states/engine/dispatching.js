import { validateAction } from "../../states-actions/mod.js"
import { throwError, throwErrors } from "../../support-errors/mod.js"
import { updateConsumers } from "../../states-consumers/mod.js"
import { getHtmlName, validateHtmlElement } from "../../states-html/mod.js"
import { logInfo } from "../../support-loggers/mod.js"
import { chainMiddlewares, getMiddlewares } from "../../states-middlewares/mod.js"
import { getReducers } from "../../states-reducers/mod.js"
import { getStates, setStates } from "../../states-states/mod.js"
import { runAction } from "./running.js"

export const dispatchAction = (elem, action) =>
{
  throwError(validateHtmlElement(elem))
  throwErrors(validateAction(action))
  logInfo(elem, "start dispatch action", action, "elem", getHtmlName(elem))

  const middlewares = getMiddlewares(elem)
  if(middlewares) {
    const middlewaresChain = chainMiddlewares(middlewares, (action) => action)
    middlewaresChain(action)
  }

  const states = getStates(elem)
  const reducers = getReducers(elem)
  const reducedStates = runAction(action, reducers, states)
  if(states === reducedStates) return []

  setStates(elem, reducedStates)
  logInfo(elem, "end dispatch action", action, "states", states, "reduces states", reducedStates)

  return updateConsumers(elem)
}