"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("../role/entities/role.entity");
const menu_entity_1 = require("../menu/entities/menu.entity");
const menu_1 = require("../../database/menu");
const user_1 = require("../../database/user");
let UserService = class UserService {
    constructor(userEntity, roleEntity, jwtService, config, dataSource) {
        this.userEntity = userEntity;
        this.roleEntity = roleEntity;
        this.jwtService = jwtService;
        this.config = config;
        this.dataSource = dataSource;
    }
    async create(createUserDto) {
        const { username } = createUserDto;
        const isUsername = await this.userEntity.findOne({ where: { username } });
        if (isUsername) {
            throw new common_1.HttpException('用户名已存在', 201);
        }
        else {
            const salt = await (0, bcryptjs_1.genSalt)();
            createUserDto.password = await (0, bcryptjs_1.hash)(createUserDto.password, salt);
            try {
                await this.userEntity.save(createUserDto);
                return '创建成功';
            }
            catch (error) {
                throw new common_1.HttpException(error, 400);
            }
        }
    }
    async login(userLoginDto) {
        const { username, password } = userLoginDto;
        const user = await this.userEntity.findOne({ where: { username } });
        if (!user) {
            throw new common_1.HttpException('用户不存在', 201);
        }
        else {
            const checkPassword = await (0, bcryptjs_1.compare)(password, user.password);
            if (checkPassword) {
                const data = this.genToken({ id: user.id });
                const token = data.accessToken;
                console.log(data, '---');
                return Object.assign({ token }, user);
            }
            else {
                throw new common_1.HttpException('密码错误', 201);
            }
        }
    }
    async findUserInfo(data) {
        const { id } = data;
        const user = await this.userEntity.findOne({ where: { id }, relations: ['roles'] });
        if (!user) {
            throw new common_1.HttpException('用户不存在', 201);
        }
        return user;
    }
    async findUserList(findUserDto) {
        console.log('findUserDto', findUserDto);
        const { page = 1, size = 10, username, nickname, id } = findUserDto;
        const where = Object.assign(Object.assign(Object.assign({}, (!!id ? { id } : null)), (!!username ? { username: (0, typeorm_2.Like)(`%${username}%`) } : null)), (!!nickname ? { nickname: (0, typeorm_2.Like)(`%${nickname}%`) } : null));
        const result = await this.userEntity.findAndCount({
            where,
            order: {
                id: 'ASC',
            },
            relations: {
                roles: true,
            },
            skip: (page - 1) * size,
            take: size,
        });
        return Object.assign({ total: result[1] }, { list: result[0] });
    }
    async saveUserRole(data) {
        const { userId } = data;
        const user = await this.userEntity.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.HttpException('用户不存在', 201);
        }
        await this.userEntity.save(user);
    }
    async findUserRole(data) {
        console.log(data, 'FindUserRoleDto');
        const { userId } = data;
        console.log(userId, 'userId');
        const res = await this.dataSource
            .createQueryBuilder(user_entity_1.UserEntity, 'user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.id = :id', { id: userId })
            .getOne();
        console.log(res);
        return res;
    }
    genToken(payload) {
        const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.config.get('jwt.refreshExpiresIn'),
        });
        return { accessToken, refreshToken };
    }
    refreshToken(id) {
        return this.jwtService.sign({ id });
    }
    verifyToken(token) {
        try {
            if (!token)
                return null;
            const id = this.jwtService.verify(token.replace('Bearer ', ''));
            return id;
        }
        catch (error) {
            return null;
        }
    }
    async initDatabase() {
        console.log('init database');
        await this.dataSource.createQueryBuilder().delete().from(user_entity_1.UserEntity).execute();
        await this.dataSource.query('ALTER TABLE user AUTO_INCREMENT = 1');
        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.UserEntity)
            .values(user_1.userDatabase)
            .execute();
        await this.dataSource.createQueryBuilder().delete().from(menu_entity_1.MenuEntity).execute();
        await this.dataSource.query('ALTER TABLE menu AUTO_INCREMENT = 1');
        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(menu_entity_1.MenuEntity)
            .values(menu_1.menuDatabase)
            .execute();
        return '初始化成功';
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map