import { logInfo } from "../../states/loggers/logging.js"
import { getHtmlName } from "../../states-html/mod.js"
import { findConsumers } from "./finding.js"
import { isUpdatableConsumer } from "./verifying.js"

const getUpdateFunc = (elem) => elem?.ownerDocument.__update

const updateConsumer = (update) => (elem) => (
  logInfo(elem, "update global states consumer:", getHtmlName(elem)),
  update(elem)[0])

export const updateConsumers = (elem, update = getUpdateFunc(elem)) =>
  findConsumers(elem)
    .filter(isUpdatableConsumer)
    .map(updateConsumer(update))

