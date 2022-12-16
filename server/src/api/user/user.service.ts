import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
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
    console.log(createUserDto);
    const { username, password } = createUserDto
    const isUsername = await this.userEntity.findOne({where: {username}})
    console.log(isUsername);
    if(isUsername) {
      return '用户名已存在'
    }
    return await this.userEntity.save(createUserDto)
  }

  findAll() {
    return `This action returns all user`
  }

  async findUserList(): Promise<any> {
    return await this.userEntity.find()
  }
  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
