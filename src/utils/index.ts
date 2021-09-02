import type { RouteRecordRaw, RouteMeta } from 'vue-router'
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
      key: (item.meta as RouteMeta).key as string
    }
    if (item.children) {
      menuItem.children = formatMenuData(item.children)
    }
    list.push(menuItem)
  })
  return list
}
