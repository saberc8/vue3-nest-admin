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
    name: 'title',
    comment: '菜单标题',
  })
  title!: string

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

  @Column({
    type: 'int',
    name: 'pid',
    default: '0',
    comment: '父级菜单id',
  })
  pid!: number

  @Column({
    type: 'tinyint',
    name: 'is_show',
    default: '1',
    comment: '是否显示1表示显示,0表示不显示',
  })
  isShow!: number

  @Column({
    type: 'tinyint',
    name: 'order_no',
    default: '0',
    comment: '菜单排序',
  })
  orderNo!: number

  @Column({
    type: 'varchar',
    length: 50,
    name: 'frame_src',
    comment: '内嵌iframe',
  })
  frameSrc!: string

  @Column({
    type: 'boolean',
    length: 50,
    name: 'ignore_keep_alive',
    default: true,
    comment: '是否缓存',
  })
  ignoreKeepAlive!: boolean
}
