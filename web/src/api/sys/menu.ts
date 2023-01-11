import { defHttp } from '@/utils/http/axios'
import { getMenuListResultModel, GetMenuListModel, AddMenuModel } from './model/menuModel'

enum Api {
  GetMenuList = '/menu/list',
  AddMenu = '/menu/add',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params: GetMenuListModel) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList, params })
}

export const addMenu = (params: AddMenuModel) => {
  return defHttp.post({ url: Api.AddMenu, params })
}
