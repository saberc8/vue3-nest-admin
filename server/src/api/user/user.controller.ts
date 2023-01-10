import { Controller, Get, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginDto } from './dto/user-login.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async add(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.create(createUserDto)
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
    return await this.userService.login(userLoginDto)
  }

  @Get('getUserInfo')
  getUserInfo() {
    return {
      name: 'admin',
    }
  }
}
