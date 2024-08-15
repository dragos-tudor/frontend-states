import { getHtmlName } from "../../states-html/mod.js"
import { getUpdateFunc } from "../funcs/getting.js"
import { logInfo } from "../loggers/logging.js"
import { findUpdatableConsumers } from "./finding.js"

const updateConsumer = (update) => (elem) => (logInfo(elem, "update global states consumer:", getHtmlName(elem)), update(elem)[0])

export const updateConsumers = (elem, update = getUpdateFunc(elem)) => findUpdatableConsumers(elem).map(updateConsumer(update))

