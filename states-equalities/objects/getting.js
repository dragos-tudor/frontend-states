import { isValidObjectPropName } from "./verifying.js"

export const getObjectPropNames = (obj) => Object.getOwnPropertyNames(obj).filter(isValidObjectPropName)