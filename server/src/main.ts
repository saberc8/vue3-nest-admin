import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 打印4000端口访问地址
  console.log(`http://localhost:4000`);
  await app.listen(4000);
}
bootstrap();
