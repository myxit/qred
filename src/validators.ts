export function isEmail(input?: any) {
  return input && typeof input === 'string' && input.indexOf('@') > -1
}

export function isEmptyStr(input?: any) {
  return !input
}