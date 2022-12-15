import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class InitDbService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    console.log('初始化数据库')
  }

}
