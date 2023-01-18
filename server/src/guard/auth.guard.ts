import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common'
import apiWriteList from './apiWriteList'
import { UserService } from '@src/api/user/user.service'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const url = request.url.split('?')[0]
    // 白名单判断
    if (apiWriteList.includes(url)) {
      return true
    }
    const token =
      context.switchToRpc().getData().headers.token ||
      context.switchToHttp().getRequest().body.token
    if (token) {
      // 如果传递了token的话就要从redis中查询是否有该token
      // -----redis拿token
      const atUserId = this.userService.verifyToken(token)
      console.log(atUserId, 'atUserId')
      if (atUserId) {
        return true
      } else {
        throw new HttpException('token无效', HttpStatus.UNAUTHORIZED)
      }
    } else {
      throw new HttpException('请传递token', HttpStatus.FORBIDDEN)
    }
  }
}
