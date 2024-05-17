
const ReservedPropNames = Object.freeze(["children"])

export const existsObject = (obj) => obj != null

export const isObjectType = (value) => typeof value === "object" && value !== null

export const isValidObjectPropName = (propName) => !ReservedPropNames.includes(propName)
