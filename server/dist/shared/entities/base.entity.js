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
exports.SharedEntity = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
class SharedEntity extends typeorm_1.BaseEntity {
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        name: 'id',
        comment: '主键id',
    }),
    __metadata("design:type", Number)
], SharedEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((row) => +new Date(row.value)),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        nullable: false,
        name: 'created_at',
        comment: '创建时间',
    }),
    __metadata("design:type", Date)
], SharedEntity.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Transform)((row) => +new Date(row.value)),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        nullable: false,
        name: 'updated_at',
        comment: '更新时间',
    }),
    __metadata("design:type", Date)
], SharedEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        nullable: false,
        name: 'deleted_at',
        select: false,
        comment: '软删除时间',
    }),
    __metadata("design:type", Date)
], SharedEntity.prototype, "deletedAt", void 0);
exports.SharedEntity = SharedEntity;
//# sourceMappingURL=base.entity.js.map