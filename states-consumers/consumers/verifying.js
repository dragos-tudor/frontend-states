import { equalValues } from "../../support-equalities/mod.js";
import { getSelectors } from "../../states-selectors/mod.js"
import { getStates } from "../../states-states/mod.js"

const isStateChanged = (elem) => selector =>
  !equalValues(selector.value, selector.func(getStates(elem)))

export const isConsumer = (elem) => !!getSelectors(elem)

export const isUpdatableConsumer = (elem) =>
  Object
    .values(getSelectors(elem))
    .filter(isStateChanged(elem))
    .some(elem => elem)