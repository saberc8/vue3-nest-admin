import { NestFactory } from '@nestjs/core'
import { Logger, VersioningType } from '@nestjs/common'
import { ApiModule } from './api/api.module'
import { getConfig } from './utils'

export const config = getConfig()
const PORT = config.PORT || 4000
const PREFIX = config.PREFIX || '/'

async function bootstrap() {
  console.log(getConfig, '--')
  const app = await NestFactory.create(ApiModule)

  //允许跨域请求
  app.enableCors()

  // 启动版本管理
  app.enableVersioning({
    defaultVersion: 'v1.0', // 不指定默认版本为v1
    type: VersioningType.URI,
  })

  // 设置请求前缀
  app.setGlobalPrefix(PREFIX)
  console.log(`http://localhost:${PORT}/${PREFIX}`)
  await app.listen(PORT)
}

bootstrap()
