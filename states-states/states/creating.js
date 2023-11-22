
export const StateType = Symbol("state")

export const createState = (name, data) => Object.freeze({
  name, data, $type: StateType
})