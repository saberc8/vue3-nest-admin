import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FindUserRoleDto } from './dto/find-user-role.dto';
import { Repository, DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from '@src/api/role/entities/role.entity';
export declare class UserService {
    private readonly userEntity;
    private readonly roleEntity;
    private readonly jwtService;
    private readonly config;
    private dataSource;
    constructor(userEntity: Repository<UserEntity>, roleEntity: Repository<RoleEntity>, jwtService: JwtService, config: ConfigService, dataSource: DataSource);
    create(createUserDto: CreateUserDto): Promise<any>;
    login(userLoginDto: UserLoginDto): Promise<any>;
    findUserInfo(data: FindUserDto): Promise<UserEntity>;
    findUserList(findUserDto: FindUserDto): Promise<{
        total: number;
    } & {
        list: UserEntity[];
    }>;
    saveUserRole(data: FindUserRoleDto): Promise<void>;
    findUserRole(data: FindUserRoleDto): Promise<UserEntity>;
    genToken(payload: {
        id: number;
    }): {
        accessToken: string;
        refreshToken: string;
    };
    refreshToken(id: number): string;
    verifyToken(token: string): string;
    initDatabase(): Promise<string>;
}
