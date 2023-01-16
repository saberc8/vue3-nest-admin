import { Global, Module } from '@nestjs/common'
import { InitDbService } from './services/init-db.service'
import { UserService } from '@src/api/user/user.service'
import { UserEntity } from '@src/api/user/entities/user.entity'
import { RoleEntity } from '@src/api/role/entities/role.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
        signOptions: {
          expiresIn: config.get('jwt.expiresin'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [InitDbService, UserService],
  exports: [InitDbService, UserService],
})
export class SharedModule {}
