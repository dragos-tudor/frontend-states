
export const findHtmlDescendants = (elem, func, elems = []) => {
  if(func(elem)) elems.push(elem)
  for(let index = 0; index < elem.children.length; index++)
    findHtmlDescendants(elem.children[index], func, elems)
  return elems
}