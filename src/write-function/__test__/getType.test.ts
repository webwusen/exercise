import { getType, isObject, isArray, isMap, isSet, isRegExp, isFunc, isDate } from '../getType'
import { describe, it, expect } from 'vitest'

describe('test getType function', () => {
  it('test getType', () => {
    expect(getType({})).toBe('[object Object]')

    expect(getType([])).toBe('[object Array]')

    expect(getType(new Date())).toBe('[object Date]')

    const reg = /\d/
    expect(getType(reg)).toBe('[object RegExp]')
    expect(getType(new RegExp(/\d/))).toBe('[object RegExp]')

    expect(getType(new Map())).toBe('[object Map]')

    expect(getType(new Set())).toBe('[object Set]')

    expect(getType(() => {})).toBe('[object Function]')

    expect(getType(null)).toBe('[object Null]')

    expect(getType(undefined)).toBe('[object Undefined]')

    expect(getType('abc')).toBe('[object String]')

    expect(getType(NaN)).toBe('[object Number]')
  })

  it('test other', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)

    expect(isArray([])).toBe(true)
    expect(isArray({})).toBe(false)

    expect(isMap(new Map())).toBe(true)
    expect(isMap([])).toBe(false)

    expect(isSet(new Set())).toBe(true)
    expect(isSet([])).toBe(false)

    expect(isRegExp(/\d/)).toBe(true)
    expect(isRegExp([])).toBe(false)

    expect(isFunc(() => {})).toBe(true)
    expect(isFunc([])).toBe(false)

    expect(isDate(new Date())).toBe(true)
    expect(isDate([])).toBe(false)
  })
})
