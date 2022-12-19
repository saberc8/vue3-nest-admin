import { SharedEntity } from '@src/shared/entities/base.entity'
import { Entity, Column, Index } from 'typeorm'
import { Expose } from 'class-transformer'

@Entity('login')
export class LoginEntity extends SharedEntity {
  constructor() {
    super()
  }
}