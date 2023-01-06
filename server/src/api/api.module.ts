import { Module } from '@nestjs/common'
import { LoginModule } from './login/login.module'
import { UserModule } from './user/user.module'
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [LoginModule, UserModule, MenuModule, RoleModule],
})
export class ApiModule {}
