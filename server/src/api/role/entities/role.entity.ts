import { SharedEntity } from '@src/shared/entities/base.entity'
import { Entity, Column, Index, OneToMany } from 'typeorm'
import { RoleMenuEntity } from '@src/api/role/entities/role-menu.entity'
@Entity('role')
export class RoleEntity extends SharedEntity {
  constructor() {
    super()
  }

  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '角色名称',
  })
  name!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'remark',
    default: '',
    comment: '备注',
  })
  remark!: string

  @OneToMany(() => RoleMenuEntity, (roleMenuEntity) => roleMenuEntity.role)
  roleToMenu!: RoleMenuEntity[]
}
