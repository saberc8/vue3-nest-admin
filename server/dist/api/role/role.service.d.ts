import { CreateRoleDto } from './dto/create-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
import { Repository, DataSource } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { UserService } from '@src/api/user/user.service';
import { MenuService } from '@src/api/menu/menu.service';
export declare class RoleService {
    private readonly roleEntity;
    private readonly userService;
    private readonly menuService;
    private dataSource;
    constructor(roleEntity: Repository<RoleEntity>, userService: UserService, menuService: MenuService, dataSource: DataSource);
    add(createRoleDto: CreateRoleDto): Promise<CreateRoleDto & RoleEntity>;
    getRoleList(findRoleDto: FindRoleDto): Promise<{
        total: number;
    } & {
        list: RoleEntity[];
    }>;
    getRoleMenuList(data: FindRoleDto): Promise<any[]>;
}
