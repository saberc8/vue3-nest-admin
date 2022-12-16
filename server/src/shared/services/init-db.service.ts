import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class InitDbService {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    initData()
  }
}

const initData = () => {
  console.log('初始化数据')
}
