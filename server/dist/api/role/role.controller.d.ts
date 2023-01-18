import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    add(createRoleDto: CreateRoleDto): Promise<CreateRoleDto & import("./entities/role.entity").RoleEntity>;
    getRoleList(findRoleDto: FindRoleDto): Promise<{
        total: number;
    } & {
        list: import("./entities/role.entity").RoleEntity[];
    }>;
    getRoleMenuList(data: FindRoleDto): Promise<any[]>;
}
