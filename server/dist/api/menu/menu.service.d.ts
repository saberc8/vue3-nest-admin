import { CreateMenuDto } from './dto/create-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { MenuEntity } from './entities/menu.entity';
export declare class MenuService {
    private readonly menuEntity;
    constructor(menuEntity: Repository<MenuEntity>);
    add(createMenuDto: CreateMenuDto): Promise<CreateMenuDto & MenuEntity>;
    updateMenu(data: UpdateMenuDto): Promise<import("typeorm").UpdateResult>;
    getMenuList(findMenuDto: FindMenuDto): Promise<{
        total: number;
    } & {
        list: MenuEntity[];
    }>;
    getAllMenuList(): Promise<MenuEntity[]>;
    deleteMenu(findMenuDto: FindMenuDto): Promise<import("typeorm").DeleteResult>;
}
