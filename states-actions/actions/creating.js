
export const ActionType = Symbol("action")

export const createAction = (type, payload) => Object.freeze({
  type, payload, $type: ActionType
})