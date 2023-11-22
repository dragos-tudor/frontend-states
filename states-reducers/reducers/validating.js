import { isFunctionsReducerFuncs, isReducerType, isStringReducerName } from "./verifying.js"


const validateReducerFuncs = (reducer) => isFunctionsReducerFuncs(reducer)? "": "Reducer funcs should contains functions."

const validateReducerName = (reducer) => isStringReducerName(reducer)? "": "Reducer name should be string."

const validateReducerType = (reducer) => isReducerType(reducer)? "": "Reducer type should be reducer [use createReducer]."

export const validateReducer = (reducer) => [
  validateReducerType(reducer),
  validateReducerName(reducer),
  validateReducerFuncs(reducer)
]
.filter(error => error)
