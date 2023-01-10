import { Controller, Get, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginDto } from './dto/user-login.dto'
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
  async getUserInfo() {
    return await this.userService.findUserList()
  }
}
