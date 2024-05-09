import { flatHtmlChildren } from "./flattening.js";
import { getHtmlBody, getHtmlParentElement } from "./getting.js"
import { existsHtmlElement, existsHtmlElements } from "./verifying.js";

const findsHtmlDescendants = (elems, func, result = []) =>
  (!existsHtmlElements(elems) && result) ||
  findsHtmlDescendants(flatHtmlChildren(elems), func, [...result, ...elems.filter(func)])

export const findHtmlAscendant = (elem, func) =>
  (existsHtmlElement(elem) || undefined) &&
  (func(elem) && elem ||
   findHtmlAscendant(getHtmlParentElement(elem), func))

export const findHtmlDescendants = (elem, func) =>
  findsHtmlDescendants([elem], func)

export const findHtmlRoot = (elem) =>
  globalThis["Deno"]?
    findHtmlAscendant(elem, (elem) => !getHtmlParentElement(elem)):
    getHtmlBody(elem)