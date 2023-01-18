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
exports.RoleMenuEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
const menu_entity_1 = require("../../menu/entities/menu.entity");
let RoleMenuEntity = class RoleMenuEntity extends base_entity_1.SharedEntity {
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
        comment: '角色名称',
    }),
    __metadata("design:type", String)
], RoleMenuEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'remark',
        default: '',
        comment: '备注',
    }),
    __metadata("design:type", String)
], RoleMenuEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_entity_1.MenuEntity, (menuEntity) => menuEntity.role),
    __metadata("design:type", Array)
], RoleMenuEntity.prototype, "menu", void 0);
RoleMenuEntity = __decorate([
    (0, typeorm_1.Entity)('role_menu'),
    __metadata("design:paramtypes", [])
], RoleMenuEntity);
exports.RoleMenuEntity = RoleMenuEntity;
//# sourceMappingURL=role.entity%20copy.js.map