import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    add(createMenuDto: CreateMenuDto): Promise<CreateMenuDto & import("./entities/menu.entity").MenuEntity>;
    updateMenu(data: UpdateMenuDto): Promise<import("typeorm").UpdateResult>;
    getMenuList(findMenuDto: FindMenuDto): Promise<{
        total: number;
    } & {
        list: import("./entities/menu.entity").MenuEntity[];
    }>;
    deleteMenu(findMenuDto: FindMenuDto): Promise<import("typeorm").DeleteResult>;
}
