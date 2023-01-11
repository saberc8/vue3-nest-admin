import type { RouteMeta } from 'vue-router'
export interface RouteItem {
  id: string
  idd: number
  path: string
  component: any
  meta: RouteMeta
  name?: string
  alias?: string | string[]
  redirect?: string
  caseSensitive?: boolean
  children?: RouteItem[]
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = {
  list: RouteItem[]
  total: number
}

export interface GetMenuListModel {
  page: number
  size: number
}

export interface AddMenuModel {
  name: string
}
