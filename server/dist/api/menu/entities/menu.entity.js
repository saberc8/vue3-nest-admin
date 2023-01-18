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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
let MenuEntity = class MenuEntity extends base_entity_1.SharedEntity {
    constructor() {
        super();
    }
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'name',
        comment: '菜单名称',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'title',
        comment: '菜单标题',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'path',
        comment: '菜单路径',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'component',
        default: '',
        comment: '菜单组件',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "component", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'icon',
        default: '',
        comment: '菜单图标',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'redirect',
        default: '',
        comment: '菜单定向/父级才有',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "redirect", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        name: 'hide_menu',
        default: false,
        comment: '是否显示菜单',
    }),
    __metadata("design:type", Boolean)
], MenuEntity.prototype, "hideMenu", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        name: 'hide_breadcrumb',
        default: false,
        comment: '是否显示面包屑',
    }),
    __metadata("design:type", Boolean)
], MenuEntity.prototype, "hideBreadcrumb", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'pid',
        default: '0',
        comment: '父级菜单id',
    }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'order_no',
        default: '0',
        comment: '菜单排序',
    }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'frame_src',
        default: '',
        comment: '内嵌iframe',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "frameSrc", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        name: 'keep_alive',
        default: true,
        comment: '是否缓存',
    }),
    __metadata("design:type", Boolean)
], MenuEntity.prototype, "keepAlive", void 0);
MenuEntity = __decorate([
    (0, typeorm_1.Entity)('menu'),
    __metadata("design:paramtypes", [])
], MenuEntity);
exports.MenuEntity = MenuEntity;
//# sourceMappingURL=menu.entity.js.map