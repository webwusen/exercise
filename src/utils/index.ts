import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'

export type menuItem = MenuOption & {
  label: string
  key: string
  path: string
  children?: Array<menuItem>
}

export function formatMenuData(routes: Array<RouteRecordRaw>): Array<menuItem> {
  const list: Array<menuItem> = []
  routes.forEach((item) => {
    const menuItem: menuItem = {
      path: item.path,
      label: item.name as string,
      key: item.path
    }
    if (item.children) {
      menuItem.children = formatMenuData(item.children)
    }
    list.push(menuItem)
  })
  return list
}
