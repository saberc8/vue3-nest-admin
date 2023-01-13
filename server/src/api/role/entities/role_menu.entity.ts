import { SharedEntity } from '@src/shared/entities/base.entity'
import { Entity, Column, Index } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
@Entity('role-menu')
export class RoleMenuEntity extends SharedEntity {
  constructor() {
    super()
  }
  @ApiProperty({ description: 'id' })
  @Index()
  @ApiProperty({ description: '角色id' })
  @Column({
    type: 'int',
    name: 'role_id',
    comment: '角色id',
  })
  roleId!: number

  @ApiProperty({ description: '菜单id' })
  @Column({
    type: 'int',
    name: 'menu_id',
    comment: '菜单id',
  })
  menuId!: number
}
