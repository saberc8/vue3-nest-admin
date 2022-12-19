import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { UserEntity } from '@src/api/user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [
    RouterModule.register([
      {
        path: '',
        module: LoginModule,
      },
    ]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
