import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { FindRoleDto } from './dto/find-role.dto'
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('add')
  add(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.add(createRoleDto)
  }

  @Get('list')
  getRoleList(@Query() findRoleDto: FindRoleDto) {
    return this.roleService.getRoleList(findRoleDto)
  }

  @Get('menuList')
  getRoleMenuList(@Query() data: FindRoleDto) {
    return this.roleService.getRoleMenuList(data)
  }
}
