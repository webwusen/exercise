import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'

export type menuItem = MenuOption & {
  label: string
  key: string
  path: string
  children?: Array<menuItem>
}

export function formatMenuData(
  routes: Array<RouteRecordRaw>,
  parent: menuItem | undefined
): Array<menuItem> {
  const list: Array<menuItem> = []
  routes.forEach((item) => {
    let path = item.path !== '/' ? '/' + item.path : item.path
    if (parent) {
      path = parent.path + path
    }
    const menuItem: menuItem = {
      path: path,
      label: item.name as string,
      key: path
    }
    if (item.children) {
      menuItem.children = formatMenuData(item.children, menuItem)
    }
    list.push(menuItem)
  })
  return list
}
