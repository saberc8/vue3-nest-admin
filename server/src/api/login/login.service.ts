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
  ){}
  async login(createLoginDto: CreateLoginDto): Promise<Object> {
    const { username, password } = createLoginDto
    const user = this.userEntity.findOne({where: {username}})
    return user
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
