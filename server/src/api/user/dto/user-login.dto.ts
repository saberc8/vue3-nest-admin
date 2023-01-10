import { IsString, IsNotEmpty } from 'class-validator'
export class UserLoginDto {
  @IsString({ message: '用户名必须是字符类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username!: string

  @IsString({ message: '确认密码必须为字符类' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  password!: string
}
