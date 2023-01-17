import { ErrorTypeEnum } from '@/enums/exceptionEnum'
import { RoleInfo } from '@/api/sys/model/userModel'

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export interface UserInfo {
  userId: string | number
  username: string
  nickname: string
  isSuperText: string
  avatar: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}
