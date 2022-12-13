import { NestFactory } from '@nestjs/core'
import { Logger, VersioningType } from '@nestjs/common'
import { ApiModule } from './api/api.module'
import { getConfig, IS_DEV } from './utils'

export const config = getConfig()
const PORT = config.PORT || 4000
const PREFIX = config.PREFIX || '/'

async function bootstrap() {
  const logger: Logger = new Logger('main.ts')
  const app = await NestFactory.create(ApiModule, {
    // 开启日志级别打印
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  })

  //允许跨域请求
  app.enableCors()

  // 启动版本管理
  app.enableVersioning({
    defaultVersion: 'v1.0', // 不指定默认版本为v1
    type: VersioningType.URI,
  })

  // 设置请求前缀
  app.setGlobalPrefix(PREFIX)
  await app.listen(PORT, () => {
    logger.log(`Server running on http://localhost:${PORT}/${PREFIX}`)
  })
}

bootstrap()
