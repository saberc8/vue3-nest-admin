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
      icon,
      component,
      redirect,
      pid,
      orderNo,
      frameSrc,
      ignoreKeepAlive,
    } = findMenuDto
    // where 搜索
    const where = {
      ...(!!name ? { name: Like(`%${name}%`) } : null),
      ...(!!title ? { title: Like(`%${title}%`) } : null),
      ...(!!path ? { path: Like(`%${path}%`) } : null),
      ...(!!icon ? { icon: Like(`%${icon}%`) } : null),
      ...(!!component ? { component: Like(`%${component}%`) } : null),
      ...(!!redirect ? { redirect: Like(`%${redirect}%`) } : null),
      ...(!!pid ? { pid } : null),
      ...(!!orderNo ? { orderNo } : null),
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
