import { RouteRecordRaw } from 'vue-router'

export interface menuItem {
  label: string | undefined | symbol
  key: string | unknown
  path: string
  children?: Array<menuItem>
}

export function formatMenuData(routes: Array<RouteRecordRaw>): Array<menuItem> {
  const list: Array<menuItem> = []
  routes.forEach((item) => {
    const menuItem: menuItem = {
      path: item.path,
      label: item.name,
      key: item?.meta?.key
    }
    if (item.children) {
      menuItem.children = formatMenuData(item.children)
    }
    list.push(menuItem)
  })
  return list
}
