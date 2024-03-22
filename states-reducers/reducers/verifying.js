import { ReducerType } from "./creating.js"
import { getReducer } from "./getting.js";

export const existsReducer = (reducers, name) => !!getReducer(reducers, name)

export const isFunctionsReducerFuncs = (reducers) => Object.values(reducers.funcs ?? {}).every(func => typeof func === "function")

export const isReducerType = (reducers) => reducers.$type === ReducerType

export const isStringReducerName = (reducers) => typeof reducers.name === "string"
