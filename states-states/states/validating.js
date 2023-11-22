import { isStateType } from "./verifying.js"

const validateStateType = (state) => isStateType(state)? "": "State type should be state [use createState]."

export const validateState = (state) => validateStateType(state)
