import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@src/api/user/entities/user.entity'
import { UserService } from '@src/api/user/user.service'
@Injectable()
export class InitDbService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  onModuleInit() {
    this.initData()
  }

  public async initData(): Promise<void> {
    const username: string = this.configService.get('user.username') ?? 'admin'
    const password: string = this.configService.get('user.password') ?? '123456'
    const nickname: string = this.configService.get('user.nickname') ?? 'admin'
    const user = await this.userEntity.findOne({
      where: {
        username,
      },
    })
    if (!user) {
      await this.userService.create({
        username,
        password,
        nickname,
        confirmPassword: password,
      })
      console.log('初始化用户成功')
    } else {
      console.log('初始化用户已存在')
      console.log(user)
    }
  }
}
