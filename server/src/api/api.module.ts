import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { MenuModule } from './menu/menu.module'
import { RoleModule } from './role/role.module'
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [UserModule, MenuModule, RoleModule, PermissionModule],
})
export class ApiModule {}
