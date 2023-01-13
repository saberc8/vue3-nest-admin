import { SharedEntity } from '@src/shared/entities/base.entity'
import { Entity, Column, Index } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
@Entity('user-role')
export class UserRoleEntity extends SharedEntity {
  constructor() {
    super()
  }
  @ApiProperty({ description: 'id' })
  @Index()
  @ApiProperty({ description: '用户id' })
  @Column({
    type: 'int',
    name: 'user_id',
    comment: '用户id',
  })
  userId!: number

  @ApiProperty({ description: '角色id' })
  @Column({
    type: 'int',
    name: 'role_id',
    comment: '角色id',
  })
  roleId!: number
}
