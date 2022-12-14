import { defHttp } from '@/utils/http/axios'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'

enum Api {
  Login = '/user/login',
  Logout = '/logout',
  GetUserInfo = '/user/getUserInfo',
  GerUserList = '/user/list',
  AddUser = '/user/add',

  TestRetry = '/testRetry',
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
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo })
}

/**
 * @description: getUserList
 */
export function getUserList() {
  return defHttp.get({ url: Api.GerUserList })
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

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  )
}
