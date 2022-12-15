import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InitDbService } from './services/init-db.service'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [InitDbService],
})
export class SharedModule {}
