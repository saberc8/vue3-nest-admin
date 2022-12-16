import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import apiWriteList from './apiWriteList'
@Injectable()
export class AuthGuard implements CanActivate {
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
    console.log(token, '当前token----')
    if (token) {
      // 如果传递了token的话就要从redis中查询是否有该token
      // -----redis拿token
      return true
    } else {
      throw new HttpException('请传递token', HttpStatus.FORBIDDEN)
    }
  }
}
