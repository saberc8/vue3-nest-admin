import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { FindMenuDto } from './dto/find-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { MenuEntity } from './entities/menu.entity'
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuEntity: Repository<MenuEntity>,
  ) {}

  async add(createMenuDto: CreateMenuDto) {
    return await this.menuEntity.save(createMenuDto)
  }

  async updateMenu(data: UpdateMenuDto) {
    console.log(data, '--------')
    const { id } = data
    const menu = await this.menuEntity.findOne({
      where: { id },
    })
    if (!menu) throw new Error('菜单不存在')
    return await this.menuEntity.update(id, data)
  }

  async getMenuList(findMenuDto: FindMenuDto) {
    const {
      page = 1,
      size = 10,
      name,
      title,
      path,
      component,
      redirect,
      pid,
      frameSrc,
      ignoreKeepAlive,
    } = findMenuDto
    // where 模糊搜索
    const where = {
      ...(!!name ? { name: Like(`%${name}%`) } : null),
      ...(!!title ? { title: Like(`%${title}%`) } : null),
      ...(!!path ? { path: Like(`%${path}%`) } : null),
      ...(!!component ? { component: Like(`%${component}%`) } : null),
      ...(!!redirect ? { redirect: Like(`%${redirect}%`) } : null),
      ...(!!pid ? { pid } : null),
      ...(!!frameSrc ? { frameSrc: Like(`%${frameSrc}%`) } : null),
      ...(!!ignoreKeepAlive ? { ignoreKeepAlive } : null),
    }
    const result = await this.menuEntity.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * size,
      take: size,
    })
    return Object.assign({ total: result[1] }, { list: result[0] })
  }

  async getAllMenuList() {
    const result = await this.menuEntity.find()
    return result
  }

  async deleteMenu(findMenuDto: FindMenuDto) {
    const { id } = findMenuDto
    console.log(id)
    const result = await this.menuEntity.delete(id)
    return result
  }
}
