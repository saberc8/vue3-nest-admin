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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const user_service_1 = require("../user/user.service");
const menu_service_1 = require("../menu/menu.service");
let RoleService = class RoleService {
    constructor(roleEntity, userService, menuService, dataSource) {
        this.roleEntity = roleEntity;
        this.userService = userService;
        this.menuService = menuService;
        this.dataSource = dataSource;
    }
    async add(createRoleDto) {
        const role = await this.roleEntity.findOne({
            where: { name: createRoleDto.name },
        });
        if (role)
            throw new Error('角色名已存在');
        return await this.roleEntity.save(createRoleDto);
    }
    async getRoleList(findRoleDto) {
        const { page = 1, size = 10, name, remark, id } = findRoleDto;
        console.log(findRoleDto);
        const where = Object.assign(Object.assign(Object.assign({}, (!!id ? { id } : null)), (!!name ? { name: (0, typeorm_2.Like)(`%${name}%`) } : null)), (!!remark ? { remark: (0, typeorm_2.Like)(`%${remark}%`) } : null));
        const result = await this.roleEntity.findAndCount({
            where,
            order: {
                id: 'ASC',
            },
            relations: {
                menus: true,
            },
            skip: (page - 1) * size,
            take: size,
        });
        return Object.assign({ total: result[1] }, { list: result[0] });
    }
    async getRoleMenuList(data) {
        const { id } = data;
        console.log(data);
        const isAdmin = await this.userService.findUserInfo({ id });
        let result = [];
        const { isSuper, roles, status } = isAdmin;
        if (!status)
            throw new Error('用户已被禁用');
        if (isSuper === 0 && !roles.length)
            throw new Error('用户未分配角色');
        if (isSuper === 1) {
            result = await this.menuService.getAllMenuList();
        }
        else if (roles.length > 0) {
            result = (await this.roleEntity.find({
                where: { id: roles[0].id },
                order: {
                    id: 'ASC',
                },
                relations: {
                    menus: true,
                },
            }))[0].menus;
        }
        const getPid = (data, pid) => {
            const arr = [];
            data.forEach((item) => {
                const obj = {
                    id: Number(item.id),
                    name: item.name,
                    pid: item.pid,
                    path: item.path,
                    component: item.component,
                };
                obj['meta'] = {
                    title: item.title,
                    icon: item.icon,
                    hideMenu: item.hideMenu,
                    hideBreadcrumb: item.hideBreadcrumb,
                    orderNo: item.orderNo,
                };
                if (obj.pid === pid) {
                    arr.push(obj);
                    obj['children'] = getPid(data, obj.id);
                }
            });
            return arr;
        };
        const menuList = getPid(result, 0);
        return menuList;
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        menu_service_1.MenuService,
        typeorm_2.DataSource])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map