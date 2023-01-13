import { Injectable } from '@nestjs/common'

@Injectable()
export class PermissionService {
  findUserRole() {
    return `This action returns all permission`
  }
}
