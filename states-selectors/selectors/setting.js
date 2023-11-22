

export const setSelector = (selectors, selector) => selectors[selector.name] = selector

export const setSelectorValue = (selector, value) => selector.value = value

export const setSelectors = (elem, selectors = {}) => elem.__selectors = elem.__selectors  || selectors