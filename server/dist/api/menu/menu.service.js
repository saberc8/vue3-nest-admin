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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_entity_1 = require("./entities/menu.entity");
let MenuService = class MenuService {
    constructor(menuEntity) {
        this.menuEntity = menuEntity;
    }
    async add(createMenuDto) {
        return await this.menuEntity.save(createMenuDto);
    }
    async updateMenu(data) {
        console.log(data, '--------');
        const { id } = data;
        const menu = await this.menuEntity.findOne({
            where: { id },
        });
        if (!menu)
            throw new Error('菜单不存在');
        return await this.menuEntity.update(id, data);
    }
    async getMenuList(findMenuDto) {
        const { page = 1, size = 10, name, title, path, component, redirect, pid, frameSrc, ignoreKeepAlive, } = findMenuDto;
        const where = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (!!name ? { name: (0, typeorm_2.Like)(`%${name}%`) } : null)), (!!title ? { title: (0, typeorm_2.Like)(`%${title}%`) } : null)), (!!path ? { path: (0, typeorm_2.Like)(`%${path}%`) } : null)), (!!component ? { component: (0, typeorm_2.Like)(`%${component}%`) } : null)), (!!redirect ? { redirect: (0, typeorm_2.Like)(`%${redirect}%`) } : null)), (!!pid ? { pid } : null)), (!!frameSrc ? { frameSrc: (0, typeorm_2.Like)(`%${frameSrc}%`) } : null)), (!!ignoreKeepAlive ? { ignoreKeepAlive } : null));
        const result = await this.menuEntity.findAndCount({
            where,
            order: {
                id: 'ASC',
            },
            skip: (page - 1) * size,
            take: size,
        });
        return Object.assign({ total: result[1] }, { list: result[0] });
    }
    async getAllMenuList() {
        const result = await this.menuEntity.find();
        return result;
    }
    async deleteMenu(findMenuDto) {
        const { id } = findMenuDto;
        console.log(id);
        const result = await this.menuEntity.delete(id);
        return result;
    }
};
MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.MenuEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map