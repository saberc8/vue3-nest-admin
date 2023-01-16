import { Injectable, HttpException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { FindUserDto } from './dto/find-user.dto'
import { FindUserRoleDto } from './dto/find-user-role.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'

import { genSalt, hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { UserEntity } from './entities/user.entity'
import { RoleEntity } from '@src/api/role/entities/role.entity'
// import { UserRoleEntity } from './entities/user_role.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
    // @InjectRepository(UserRoleEntity)
    // private readonly userRoleEntity: Repository<UserRoleEntity>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private dataSource: DataSource,
  ) {}

  /**
   * @description: 创建用户接口
   * @param {CreateUserDto} createUserDto
   * @return {*}
   */
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username } = createUserDto
    const isUsername = await this.userEntity.findOne({ where: { username } })
    if (isUsername) {
      throw new HttpException('用户名已存在', 201)
    } else {
      // 加盐 防止重复创建
      const salt = await genSalt()
      createUserDto.password = await hash(createUserDto.password, salt)
      try {
        await this.userEntity.save(createUserDto)
        return '创建成功'
      } catch (error) {
        throw new HttpException(error, 400)
      }
    }
  }

  /**
   * @description: 用户登录接口
   * @param {UserLoginDto} userLoginDto
   * @return {*}
   */
  async login(userLoginDto: UserLoginDto): Promise<any> {
    const { username, password } = userLoginDto
    const user = await this.userEntity.findOne({ where: { username } })
    if (!user) {
      throw new HttpException('用户不存在', 201)
    } else {
      const checkPassword = await compare(password, user.password)
      if (checkPassword) {
        // jwt token
        const data = this.genToken({ id: user.id })
        const token = data.accessToken
        console.log(data, '---')
        return Object.assign({ token }, user)
      } else {
        throw new HttpException('密码错误', 201)
      }
    }
  }

  async findUserInfo(): Promise<any> {
    return await this.userEntity.find()
  }

  async findUserList(findUserDto: FindUserDto) {
    const { page = 1, size = 10, username, id } = findUserDto
    // where 模糊搜索
    const where = {
      ...(!!id ? { id } : null),
      ...(!!username ? { username } : null),
    }
    const result = await this.userEntity.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      // 多对多
      relations: ['role'],
      skip: (page - 1) * size,
      take: size,
    })

    // 写法二：使用 queryBuilder
    // const result = await this.dataSource
    //   .createQueryBuilder(UserEntity, 'user')
    //   .leftJoinAndSelect('user.role', 'role')
    //   .where(where)
    //   .orderBy('user.id', 'ASC')
    //   .skip((page - 1) * size)
    //   .take(size)
    //   .getManyAndCount()
    return Object.assign({ total: result[1] }, { list: result[0] })
  }

  // 保存用户角色
  async saveUserRole(data: FindUserRoleDto) {
    const { userId, roleId } = data
    const user = await this.userEntity.findOne({ where: { id: userId } })
    if (!user) {
      throw new HttpException('用户不存在', 201)
    }
    // const role = await this.roleEntity.findOne({ where: { id: roleId } })
    // if (!role) {
    //   throw new HttpException('角色不存在', 201)
    // }
    // user.role = role
    await this.userEntity.save(user)
  }

  async findUserRole(data: FindUserRoleDto) {
    console.log(data, 'FindUserRoleDto')
    const { userId } = data
    console.log(userId, 'userId')
    // const res = await this.userEntity.findAndCount()

    const res = await this.dataSource
      .createQueryBuilder(UserEntity, 'user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id: userId })
      .getOne()
    console.log(res)
    return res
  }

  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  genToken(payload: { id: number }) {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    })
    return { accessToken, refreshToken }
  }

  /**
   * 生成刷新 token
   */
  refreshToken(id: number): string {
    return this.jwtService.sign({ id })
  }

  /** 校验 token */
  verifyToken(token: string): string {
    try {
      if (!token) return null
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return null
    }
  }
}
