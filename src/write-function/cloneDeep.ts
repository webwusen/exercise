import {
  getType,
  isObject,
  isArray,
  isFunc,
  TypeBool,
  TypeDate,
  TypeMap,
  TypeRegExp,
  TypeSet
} from './getType'
export function initCloneByType(value: any, type: string): any {
  const Ctor = value.constructor
  switch (type) {
    case TypeBool:
    case TypeDate:
    case TypeRegExp:
      return new Ctor(value)

    case TypeMap:
    case TypeSet:
      return new Ctor()
  }
}
export type objType = {
  [key: string]: any
}
export type arrType = {
  [key: number]: any
}
export default function cloneDeep(value: any, map?: WeakMap<any, any>): any {
  let result: any
  if (typeof value !== 'object' || isFunc(value)) return value
  // 使用WeakMap解决循环引用问题
  map || (map = new WeakMap())
  const stack = map.get(value)
  if (stack) {
    return stack
  }
  map.set(value, value)

  const type = getType(value)

  if (isObject(value)) {
    result = {}
    Object.keys(value).forEach((key) => {
      result[key] = cloneDeep((value as objType)[key], map)
    })
    return result
  } else if (isArray(value)) {
    result = []
    ;(value as Array<arrType>).forEach((item, index) => {
      result[index] = cloneDeep(item, map)
    })
    return result
  } else {
    result = initCloneByType(value, type)
  }
  if (type === TypeMap) {
    value.forEach((val: any, key: any) => {
      result.set(key, cloneDeep(val, map))
    })
  } else if (type === TypeSet) {
    value.forEach((val: any) => {
      result.add(cloneDeep(val, map))
    })
  }
  return result
}
