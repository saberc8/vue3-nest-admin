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
exports.UserEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const role_entity_1 = require("../../role/entities/role.entity");
let UserEntity = class UserEntity extends base_entity_1.SharedEntity {
    constructor() {
        super();
    }
    statusStr() {
        return this.status === 0 ? '禁止' : '正常';
    }
    isSuperStr() {
        return this.isSuper === 1 ? '超级管理员' : '普通用户';
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'id' }),
    (0, typeorm_1.Index)(),
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'username',
        comment: '用户名',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码' }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'password',
        comment: '密码',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'nickname',
        comment: '用户昵称',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'avatar',
        default: '',
        comment: '用户头像',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'is_super',
        default: '0',
        comment: '是否为超级管理员1表示是,0表示不是',
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "isSuper", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'status',
        default: '1',
        comment: '用户状态1表示正常,0表示禁止',
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'statusText' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserEntity.prototype, "statusStr", null);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'isSuperText' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserEntity.prototype, "isSuperStr", null);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user'),
    __metadata("design:paramtypes", [])
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map