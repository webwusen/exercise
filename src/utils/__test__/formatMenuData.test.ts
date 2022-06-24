import { formatMenuData } from '../formatMenuData'
import { describe, it, expect } from 'vitest'

describe('exec formatMenuData function', () => {
  it('parmas []', () => {
    expect(formatMenuData([])).toStrictEqual([])
  })

  it('parmas param', () => {
    const component = () => import('@/pages/dashboard/index.vue')
    const param = [
      {
        name: 'a',
        path: 'a',
        component,
        children: [
          {
            name: 'a-2',
            path: 'a-2',
            component
          }
        ]
      },
      {
        name: 'b',
        path: 'b',
        component
      }
    ]
    const result = [
      {
        path: '/a',
        label: 'a',
        key: '/a',
        children: [
          {
            path: '/a/a-2',
            key: '/a/a-2',
            label: 'a-2'
          }
        ]
      },
      {
        path: '/b',
        key: '/b',
        label: 'b'
      }
    ]
    expect(formatMenuData(param)).toStrictEqual(result)
  })
})
