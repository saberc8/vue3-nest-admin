import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getConfig } from './utils'

export const config = getConfig()
const PORT = config.PORT || 4000
const PREFIX = config.PREFIX || '/'

async function bootstrap() {
  console.log(getConfig, '--')
  const app = await NestFactory.create(AppModule)

  //允许跨域请求
  app.enableCors()

  // 设置请求前缀
  app.setGlobalPrefix(PREFIX)
  console.log(`http://localhost:${PORT}/${PREFIX}`)
  await app.listen(PORT)
}

bootstrap()
