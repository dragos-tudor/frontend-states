import { isLogEnabled } from "./verifying.js"

const LibraryName = "states"
const LogHeader = "[states]"

export const logError = (elem, ...args) => isLogEnabled(elem, LibraryName) && console.error(LogHeader, ...args)

export const logInfo = (elem, ...args) => isLogEnabled(elem, LibraryName) && console.info(LogHeader, ...args)
