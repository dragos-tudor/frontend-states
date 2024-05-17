import { equalValues } from "../values/equaling.js"
import { equalArraysLength } from "./verifying.js"
import { existsArray } from "./verifying.js"

export const equalArrays = (arr1, arr2) => {
  if(!existsArray(arr1) || !existsArray(arr2)) return arr1 === arr2
  if(!equalArraysLength(arr1, arr2)) return false

  for (let index = 0; index < arr1.length; index++)
    if(!equalValues(arr1[index], arr2[index])) return false
  return true
}
