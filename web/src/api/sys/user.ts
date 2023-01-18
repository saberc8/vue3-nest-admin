import { defHttp } from '@/utils/http/axios'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'

enum Api {
  Login = '/user/login',
  Logout = '/logout',
  GetUserInfo = '/user/getUserInfo',
  GerUserList = '/user/list',
  AddUser = '/user/add',
  InitDatabase = '/user/initDatabase',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>({
    url: Api.Login,
    params,
  })
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(id: number) {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo, params: { id } })
}

/**
 * @description: getUserList
 */
export function getUserList(params) {
  return defHttp.get({ url: Api.GerUserList, params })
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout })
}

/**
 * @description: user login api
 */
export function addUser(params) {
  return defHttp.post({
    url: Api.AddUser,
    params,
  })
}

export function initDatabase() {
  return defHttp.post({
    url: Api.InitDatabase,
  })
}
