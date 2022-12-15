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
}
