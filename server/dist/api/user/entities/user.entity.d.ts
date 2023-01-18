import { SharedEntity } from '@src/shared/entities/base.entity';
import { RoleEntity } from '@src/api/role/entities/role.entity';
export declare class UserEntity extends SharedEntity {
    constructor();
    username: string;
    password: string;
    nickname: string;
    avatar: string;
    isSuper: number;
    status: number;
    statusStr(): string;
    isSuperStr(): string;
    roles: RoleEntity[];
}
