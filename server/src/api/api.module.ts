import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { MenuModule } from './menu/menu.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [UserModule, MenuModule, RoleModule],
})
export class ApiModule {}
