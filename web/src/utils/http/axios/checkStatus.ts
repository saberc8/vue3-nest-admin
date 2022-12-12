import type { ErrorMessageMode } from '/#/axios'
import { useMessage } from '@/hooks/web/useMessage'
// import router from '@/router';
// import { PageEnum } from '@/enums/pageEnum';
import { useUserStoreWithOut } from '@/store/modules/user'
import projectSetting from '@/settings/projectSetting'
import { SessionTimeoutProcessingEnum } from '@/enums/appEnum'

const { createMessage, createErrorModal } = useMessage()
const error = createMessage.error!
const stp = projectSetting.sessionTimeoutProcessing

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  const userStore = useUserStoreWithOut()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      userStore.setToken(undefined)
      errMessage = msg
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true)
      } else {
        userStore.logout(true)
      }
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: errMessage })
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` })
    }
  }
}
