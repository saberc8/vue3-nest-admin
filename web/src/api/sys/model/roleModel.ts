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
 * @description: Get role return value
 */
export type getRoleListResultModel = {
  list: RouteItem[]
  total: number
}

export interface GetRoleListModel {
  page: number
  size: number
}

export interface AddRoleModel {
  name: string
}
