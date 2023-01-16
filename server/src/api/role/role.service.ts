import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { FindRoleDto } from './dto/find-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { RoleEntity } from './entities/role.entity'
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
  ) {}

  async add(createRoleDto: CreateRoleDto) {
    const role = await this.roleEntity.findOne({
      where: { name: createRoleDto.name },
    })
    if (role) throw new Error('角色名已存在')
    return await this.roleEntity.save(createRoleDto)
  }

  async getRoleList(findRoleDto: FindRoleDto) {
    const { page = 1, size = 10, name, remark, id } = findRoleDto
    console.log(findRoleDto)
    // where 模糊搜索
    const where = {
      ...(!!id ? { id } : null),
      ...(!!name ? { name: Like(`%${name}%`) } : null),
      ...(!!remark ? { remark: Like(`%${remark}%`) } : null),
    }
    const result = await this.roleEntity.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      relations: ['roleToMenu'],
      skip: (page - 1) * size,
      take: size,
    })
    return Object.assign({ total: result[1] }, { list: result[0] })
  }
}
