
export const setReducer = (reducers, reducer) => reducers[reducer.name] = reducer.funcs

export const setReducers = (elem, reducers = {}) => elem.ownerDocument.__reducers = reducers

