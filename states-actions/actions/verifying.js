import { ActionType } from "./creating.js"
import { splitActionType } from "./splitting.js"

export const isActionType = (action) => action.$type === ActionType

export const isActionTypeFormat = (action) => typeof action.type === "string" && splitActionType(action.type).length === 2