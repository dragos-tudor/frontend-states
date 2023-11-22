
export const setState = (states, state) => states[state.name] = state.data

export const setStates = (elem, states = {}) => elem.ownerDocument.__states = states