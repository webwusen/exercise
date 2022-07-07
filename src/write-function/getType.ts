export const TypeObject = '[object Object]'
export const TypeBool = '[object Boolean]'
export const TypeArray = '[object Array]'
export const TypeDate = '[object Date]'
export const TypeFunc = '[object Function]'
export const TypeMap = '[object Map]'
export const TypeSet = '[object Set]'
export const TypeRegExp = '[object RegExp]'

export function getType(value: any): string {
  return toString.call(value)
}
// object {}
export function isObject(value: any): boolean {
  return getType(value) === TypeObject
}

// array []
export function isArray(value: any): boolean {
  return Array.isArray(value)
}

// new Map()
export function isMap(value: any): boolean {
  return getType(value) === TypeMap
}

// new Set()
export function isSet(value: any): boolean {
  return getType(value) === TypeSet
}

// new RegExp()
export function isRegExp(value: any): boolean {
  return getType(value) === TypeRegExp
}

// Function
export function isFunc(value: any): boolean {
  return getType(value) === TypeFunc
}

// Date
export function isDate(value: any): boolean {
  return getType(value) === TypeDate
}
