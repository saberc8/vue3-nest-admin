import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { FindRoleDto } from './dto/find-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, DataSource } from 'typeorm'
import { RoleEntity } from './entities/role.entity'
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
    private dataSource: DataSource,
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
      relations: {
        menus: true,
      },
      skip: (page - 1) * size,
      take: size,
    })
    // 写法二：使用 queryBuilder
    // const result = await this.dataSource
    //   .createQueryBuilder(RoleEntity, 'role')
    //   .leftJoinAndSelect('role.menu', 'menu')
    //   .where(where)
    //   .orderBy('menu.id', 'ASC')
    //   .skip((page - 1) * size)
    //   .take(size)
    //   .getManyAndCount()
    return Object.assign({ total: result[1] }, { list: result[0] })
  }

  async getRoleMenuList(data: FindRoleDto) {
    const { id } = data
    console.log(data)
    // where 模糊搜索
    const where = {
      ...(!!id ? { id } : null),
    }
    const result = await this.roleEntity.find({
      where,
      order: {
        id: 'ASC',
      },
      relations: {
        menus: true,
      },
    })
    console.log(result)
    // 递归pid ID
    const getPid = (data, pid) => {
      const arr = []
      data.forEach((item) => {
        console.log(item)
        const obj = {
          id: Number(item.id),
          name: item.name,
          pid: item.pid,
          path: item.path,
          component: item.component,
        }
        obj['meta'] = {
          title: item.title,
          icon: item.icon,
          hideMenu: item.hideMenu,
          hideBreadcrumb: item.hideBreadcrumb,
          orderNo: item.orderNo,
        }
        if (obj.pid === pid) {
          arr.push(obj)
          obj['children'] = getPid(data, obj.id)
        }
      })
      return arr
    }

    const menuList = getPid(result[0].menus, 0)
    return menuList
  }
}
