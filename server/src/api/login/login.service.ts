import { Injectable } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'
import { UpdateLoginDto } from './dto/update-login.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@src/api/user/entities/user.entity'
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userEntity: Repository<UserEntity>,
  ) {}
  async login(createLoginDto: CreateLoginDto) {
    const { username, password } = createLoginDto
    console.log(username, password)
    // TODO: 待开发验证用户名密码是否正确
    const user = await this.userEntity.findOne({ where: { username } })
    const token = '123456'
    const result = Object.assign(user)

    result.token = token
    console.log(result)
    return result
  }

  findAll() {
    return `This action returns all login`
  }

  findOne(id: number) {
    return `This action returns a #${id} login`
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id}${updateLoginDto} login`
  }

  remove(id: number) {
    return `This action removes a #${id} login`
  }
}
