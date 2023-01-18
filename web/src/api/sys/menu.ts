import { defHttp } from '@/utils/http/axios'
import { getMenuListResultModel, GetMenuListModel, AddMenuModel } from './model/menuModel'

enum Api {
  GetMenuList = '/menu/list',
  GetRoleMenuList = '/role/menuList',
  AddMenu = '/menu/add',
  DeleteMenu = '/menu/delete',
  UpdateMenu = '/menu/update',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params: GetMenuListModel) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList, params })
}

export const getRoleMenuList = (id: number) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetRoleMenuList, params: { id } })
}

export const addMenu = (params: AddMenuModel) => {
  return defHttp.post({ url: Api.AddMenu, params })
}

export const deleteMenu = (params) => {
  return defHttp.delete({ url: Api.DeleteMenu, params })
}

export const updateMenu = (params) => {
  return defHttp.post({ url: Api.UpdateMenu, params })
}
