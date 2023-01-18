import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { RoleEntity } from './entities/role.entity'
import { MenuEntity } from '@src/api/menu/entities/menu.entity'
@Module({
  imports: [
    RouterModule.register([
      {
        path: '', // 这里 如果不写path，那么就是默认的根路径
        module: RoleModule,
      },
    ]),
    TypeOrmModule.forFeature([RoleEntity, MenuEntity]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
