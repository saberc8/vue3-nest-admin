import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { UserRoleEntity } from '../user/entities/user_role.entity'
import { RoleMenuEntity } from '../role/entities/role_menu.entity'

import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    RouterModule.register([
      {
        path: '', // 这里 如果不写path，那么就是默认的根路径
        module: PermissionModule,
      },
    ]),
    TypeOrmModule.forFeature([UserRoleEntity, RoleMenuEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
        signOptions: {
          expiresIn: config.get('jwt.expiresin'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
