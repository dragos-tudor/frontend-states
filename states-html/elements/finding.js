import { getHtmlBody, getHtmlParentElement } from "./getting.js"

export const findHtmlAscendant = (elem, func) => {
  if(func(elem)) return elem
  if(!getHtmlParentElement(elem)) return undefined
  return findHtmlAscendant(getHtmlParentElement(elem), func)
}

export const findHtmlDescendants = (elem, func, elems = []) => {
  if(func(elem)) elems.push(elem)
  for(let index = 0; index < elem.children.length; index++)
    findHtmlDescendants(elem.children[index], func, elems)
  return elems
}

export const findHtmlRoot = (elem) =>
  globalThis["Deno"]?
    findHtmlAscendant(elem, (elem) => !getHtmlParentElement(elem)):
    getHtmlBody(elem)