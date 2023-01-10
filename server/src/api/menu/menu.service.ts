import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { FindMenuDto } from './dto/find-menu.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    console.log(findMenuDto, '-=-')
    const { page = 1, size = 10 } = findMenuDto
    const result = await this.menuEntity.findAndCount({
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * size,
      take: size,
    })
    console.log(result)
    return Object.assign({ total: result[1] }, { list: result[0] })
  }
}
