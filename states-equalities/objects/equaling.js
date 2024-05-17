import { equalValues } from "../values/equaling.js"
import { countObjectProps } from "./counting.js"
import { getObjectPropNames } from "./getting.js"
import { existsObject } from "./verifying.js"

const equalObjectsProp = (obj1, obj2, propName) => equalValues(obj1[propName], obj2[propName])

const equalObjectsProps = (obj1, obj2) => getObjectPropNames(obj1).every(propName => equalObjectsProp(obj1, obj2, propName))

export const equalObjects = (obj1, obj2) => {
  if(!existsObject(obj1) || !existsObject(obj2)) return obj1 === obj2
  if(countObjectProps(obj1) !== countObjectProps(obj2)) return false

  return equalObjectsProps(obj1, obj2)
}