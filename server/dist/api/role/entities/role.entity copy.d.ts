import { SharedEntity } from '@src/shared/entities/base.entity';
import { MenuEntity } from '@src/api/menu/entities/menu.entity';
export declare class RoleMenuEntity extends SharedEntity {
    constructor();
    name: string;
    remark: string;
    menu: MenuEntity[];
}
