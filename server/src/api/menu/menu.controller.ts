import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { FindMenuDto } from './dto/find-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  add(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.add(createMenuDto)
  }

  @Post('update')
  updateMenu(@Body() data: UpdateMenuDto) {
    return this.menuService.updateMenu(data)
  }

  @Get('list')
  getMenuList(@Query() findMenuDto: FindMenuDto) {
    return this.menuService.getMenuList(findMenuDto)
  }

  @Delete('delete')
  deleteMenu(@Body() findMenuDto: FindMenuDto) {
    console.log(findMenuDto, 'findMenuDto')
    return this.menuService.deleteMenu(findMenuDto)
  }
}
