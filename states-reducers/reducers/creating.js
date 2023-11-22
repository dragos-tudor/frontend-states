
export const ReducerType = Symbol("reducer")

export const createReducer = (name, funcs) => Object.freeze({
  name, funcs, $type: ReducerType
})