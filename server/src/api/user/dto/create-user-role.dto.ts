import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
export class CreateUserRoleDto {
  @ApiProperty({ description: '用户id 集合' })
  @IsString({ message: '用户名必须是数字类型' })
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly userId!: number

  @ApiProperty({ description: '角色id 集合' })
  @IsString({ message: '角色id必须是数字类型' })
  @IsNotEmpty({ message: '角色id不能为空' })
  readonly roleId!: number
}
