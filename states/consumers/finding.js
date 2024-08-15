import { findHtmlDescendants } from "../../states-html/mod.js"
import { isConsumer, isUpdatableConsumer } from "./verifying.js"

export const findConsumers = (elem) => findHtmlDescendants(elem, isConsumer)

export const findUpdatableConsumers = (elem) => findConsumers(elem).filter(isUpdatableConsumer)