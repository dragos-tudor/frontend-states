import { isFunctionSelectorFunc, isStringSelectorName } from "./verifying.js"

export const validateSelectorFunc = (func) => isFunctionSelectorFunc(func)? "": "Selector func should be function."

export const validateSelectorName = (name) => isStringSelectorName(name)? "": "Selector name should be string."