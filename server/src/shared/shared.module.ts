import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InitDbService } from './services/init-db.service'
import { UserEntity } from '@src/api/user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [InitDbService],
})
export class SharedModule {}
