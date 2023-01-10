import { defHttp } from '@/utils/http/axios'
import { getMenuListResultModel, GetMenuListModel } from './model/menuModel'

enum Api {
  GetMenuList = '/menu/list',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params: GetMenuListModel) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList, params })
}
