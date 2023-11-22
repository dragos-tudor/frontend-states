import { ReducerType } from "./creating.js"

export const isFunctionsReducerFuncs = (reducers) => Object.values(reducers.funcs ?? {}).every(func => typeof func === "function")

export const isReducerType = (reducers) => reducers.$type === ReducerType

export const isStringReducerName = (reducers) => typeof reducers.name === "string"
