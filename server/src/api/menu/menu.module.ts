import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuService } from './menu.service'
import { MenuController } from './menu.controller'
import { MenuEntity } from './entities/menu.entity'

@Module({
  imports: [
    RouterModule.register([
      {
        path: '', // 这里 如果不写path，那么就是默认的根路径
        module: MenuModule,
      },
    ]),
    TypeOrmModule.forFeature([MenuEntity]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
