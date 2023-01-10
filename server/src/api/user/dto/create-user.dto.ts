import { IsEqual } from '@src/validators'
import { IsString, IsNotEmpty } from 'class-validator'
export class CreateUserDto {
  @IsString({ message: '用户名必须是字符类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username!: string

  @IsString({ message: '用户昵称必须是字符类型' })
  @IsNotEmpty({ message: '用户昵称不能为空' })
  readonly nickname!: string

  @IsString({ message: '确认密码必须为字符类' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  password!: string

  @IsEqual('password')
  @IsString({ message: '确认密码必须为字符类' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  readonly confirmPassword!: string
}
