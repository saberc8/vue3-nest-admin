import { defHttp } from '@/utils/http/axios'
import { getRoleListResultModel, GetRoleListModel, AddRoleModel } from './model/roleModel'

enum Api {
  GetRoleList = '/role/list',
  AddRole = '/role/add',
}

/**
 * @description: Get user role based on id
 */

export const getRoleList = (params: GetRoleListModel) => {
  return defHttp.get<getRoleListResultModel>({ url: Api.GetRoleList, params })
}

export const addRole = (params: AddRoleModel) => {
  return defHttp.post({ url: Api.AddRole, params })
}
