import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { FindUserDto } from './dto/find-user.dto'
import { FindUserRoleDto } from './dto/find-user-role.dto'
import { UserEntity } from './entities/user.entity'
import { ApiTags, ApiOperation, ApiBody, ApiExtraModels, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('用户账号')
@ApiBearerAuth()
@ApiExtraModels(UserEntity)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '更改用户可用状态' })
  @ApiBody({ type: CreateUserDto })
  @Post('add')
  async add(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.create(createUserDto)
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
    return await this.userService.login(userLoginDto)
  }

  @Get('getUserInfo')
  async getUserInfo(@Query() data: FindUserDto) {
    return await this.userService.findUserInfo(data)
  }

  @Get('list')
  async getUserList(@Query() findUserDto: FindUserDto) {
    return await this.userService.findUserList(findUserDto)
  }

  @Get('findUserRole')
  async findUserRole(@Query() data: FindUserRoleDto) {
    return await this.userService.findUserRole(data)
  }

  @Post('saveUserRole')
  async saveUserRole(@Body() data: FindUserRoleDto) {
    console.log(data)
    return await this.userService.saveUserRole(data)
  }

  @Post('initDatabase')
  async initDatabase() {
    return await this.userService.initDatabase()
  }
}
