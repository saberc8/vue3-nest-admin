import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { FindRoleDto } from './dto/find-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, DataSource } from 'typeorm'
import { RoleEntity } from './entities/role.entity'
import { UserService } from '@src/api/user/user.service'
import { MenuService } from '@src/api/menu/menu.service'
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
    private readonly userService: UserService,
    private readonly menuService: MenuService,
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
  // 如果是管理员，返回所有菜单，禁用不返回，如果是普通用户，返回角色对应的菜单
  async getRoleMenuList(data: FindRoleDto) {
    const { id } = data
    console.log(data)
    const isAdmin = await this.userService.findUserInfo({ id })
    let result = []
    const { isSuper, roles, status } = isAdmin
    if (!status) throw new Error('用户已被禁用')
    if (isSuper === 0 && !roles.length) throw new Error('用户未分配角色')
    if (isSuper === 1) {
      result = await this.menuService.getAllMenuList()
    } else if (roles.length > 0) {
      result = (
        await this.roleEntity.find({
          where: { id: roles[0].id },
          order: {
            id: 'ASC',
          },
          relations: {
            menus: true,
          },
        })
      )[0].menus
    }
    // 递归pid ID
    const getPid = (data, pid) => {
      const arr = []
      data.forEach((item) => {
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

    const menuList = getPid(result, 0)
    return menuList
  }
}
