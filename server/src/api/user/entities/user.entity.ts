import { SharedEntity } from '@src/shared/entities/base.entity'
import { Entity, Column, Index, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity('user')
export class UserEntity extends SharedEntity {
  constructor() {
    super()
  }

  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'username',
    comment: '用户名',
  })
  username!: string

  @Column({
    type: 'varchar',
    length: 100,
    name: 'password',
    select: false,
    comment: '密码',
  })
  password!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'nickname',
    comment: '用户昵称',
  })
  nickname!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'avatar',
    default: '',
    comment: '用户头像',
  })
  avatar!: string

  @Column({
    type: 'tinyint',
    name: 'is_super',
    default: '0',
    comment: '是否为超级管理员1表示是,0表示不是',
  })
  isSuper!: number

  @Expose()
  isSuperStr(): string {
    return this.isSuper === 1 ? '超级管理员' : '普通用户'
  }
}
