import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { FindMenuDto } from './dto/find-menu.dto'
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  add(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.add(createMenuDto)
  }

  @Get('list')
  getMenuList(@Query() findMenuDto: FindMenuDto) {
    return this.menuService.getMenuList(findMenuDto)
  }
}
