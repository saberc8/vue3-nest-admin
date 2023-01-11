import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { FindMenuDto } from './dto/find-menu.dto'
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
}
