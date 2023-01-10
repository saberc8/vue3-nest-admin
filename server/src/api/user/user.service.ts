import { Injectable, HttpException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginDto } from './dto/user-login.dto'

import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  /**
   * @description: 创建用户接口
   * @param {CreateUserDto} createUserDto
   * @return {*}
   */
  async create(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto, '-=-=')
    const { username } = createUserDto
    const isUsername = await this.userEntity.findOne({ where: { username } })
    console.log(isUsername, '----')
    if (isUsername) {
      throw new HttpException('用户名已存在', 201)
    } else {
      // 加盐 防止重复创建
      const salt = await genSalt()
      createUserDto.password = await hash(createUserDto.password, salt)
      console.log(createUserDto, 'salt')
      try {
        const result = await this.userEntity.save(createUserDto)
        return result
      } catch (error) {
        throw new HttpException(error, 400)
      }
    }
  }

  /**
   * @description: 用户注册
   * @param {UserLoginDto} userLoginDto
   * @return {*}
   */
  async login(userLoginDto: UserLoginDto): Promise<any> {
    console.log(userLoginDto, '-=-=')
    const { username } = userLoginDto
    const isUsername = await this.userEntity.findOne({ where: { username } })
    console.log(isUsername, '----')
    if (!isUsername) {
      throw new HttpException('用户不存在', 201)
    } else {
      // 加盐 防止重复创建
      return isUsername
    }
  }

  async findUserList(): Promise<any> {
    return await this.userEntity.find()
  }
}
