
export const throwErrors = (messages) => { if(!messages.length) return false; throw new Error(messages.join(",")); }