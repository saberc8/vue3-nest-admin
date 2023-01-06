import { SharedEntity } from '@src/shared/entities/base.entity'
import { Entity, Column, Index } from 'typeorm'

@Entity('menu')
export class MenuEntity extends SharedEntity {
  constructor() {
    super()
  }

  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '菜单名称',
  })
  name!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'path',
    comment: '菜单路径',
  })
  path!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'icon',
    comment: '菜单图标',
  })
  icon!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'component',
    comment: '菜单组件',
  })
  component!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'redirect',
    comment: '菜单重定向',
  })
  redirect!: string
}
