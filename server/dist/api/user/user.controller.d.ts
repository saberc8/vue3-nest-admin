import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FindUserRoleDto } from './dto/find-user-role.dto';
import { UserEntity } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    add(createUserDto: CreateUserDto): Promise<string>;
    login(userLoginDto: UserLoginDto): Promise<string>;
    getUserInfo(data: FindUserDto): Promise<UserEntity>;
    getUserList(findUserDto: FindUserDto): Promise<{
        total: number;
    } & {
        list: UserEntity[];
    }>;
    findUserRole(data: FindUserRoleDto): Promise<UserEntity>;
    saveUserRole(data: FindUserRoleDto): Promise<void>;
    initDatabase(): Promise<string>;
}
