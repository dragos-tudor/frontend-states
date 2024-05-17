import { throwError } from "../errors/throwing.js"
import { createSelector } from "./creating.js"
import { getSelector } from "./getting.js";
import { setSelector, setSelectorValue } from "./setting.js"
import { validateSelectorFunc, validateSelectorName } from "./validating.js"

export const useSelector = (selectors, name, func, states) =>
{
  throwError(validateSelectorFunc(func))
  throwError(validateSelectorName(name))

  const value = func(states)
  getSelector(selectors, name)?
    setSelectorValue(getSelector(selectors, name), value):
    setSelector(selectors, createSelector(name, func, value))
  return value
}