import { StateType } from "./creating.js"
import { getState } from "./getting.js"

export const existsState = (states, name) => !!getState(states, name)

export const isStateType = (reducers) => reducers.$type === StateType
