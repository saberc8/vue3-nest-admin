import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InitDbService } from './services/init-db.service'
import { UserService } from '@src/api/user/user.service'
import { UserEntity } from '@src/api/user/entities/user.entity'
import { LoginService } from '@src/api/login/login.service'
import { TypeOrmModule } from '@nestjs/typeorm'
@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [InitDbService, UserService],
  exports: [InitDbService, UserService],
})
export class SharedModule {}
