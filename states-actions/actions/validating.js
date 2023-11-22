import { isActionType } from "./verifying.js"
import { isActionTypeFormat } from "./verifying.js"

const validateActionType = (action) => isActionType(action)? "": "Action type should be action [use createAction]."

const validateActionTypeFormat = (action) => isActionTypeFormat(action)? "": "Action type should have slice/reducer format."

export const validateAction = (action) => [
  validateActionType(action),
  validateActionTypeFormat(action)
]
.filter(error => error)

