import cloneDeep from '../cloneDeep'
import { describe, it, expect } from 'vitest'
describe('test cloneDeep', () => {
  it('test params', () => {
    expect(cloneDeep(1)).toBe(1)

    const date = new Date()
    console.log(cloneDeep(date))
    expect(cloneDeep(date)).not.toBe(date)
    expect(cloneDeep(date).getTime()).toBe(date.getTime())

    const obj = {
      a: 1,
      b: 2,
      c: 3
    }
    expect(cloneDeep(obj)).toEqual(obj)
    expect(cloneDeep(obj)).not.toBe(obj)
  })
})
