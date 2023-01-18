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
exports.CreateUserRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserRoleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户id 集合' }),
    (0, class_validator_1.IsString)({ message: '用户名必须是数字类型' }),
    (0, class_validator_1.IsNotEmpty)({ message: '用户id不能为空' }),
    __metadata("design:type", Number)
], CreateUserRoleDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色id 集合' }),
    (0, class_validator_1.IsString)({ message: '角色id必须是数字类型' }),
    (0, class_validator_1.IsNotEmpty)({ message: '角色id不能为空' }),
    __metadata("design:type", Number)
], CreateUserRoleDto.prototype, "roleId", void 0);
exports.CreateUserRoleDto = CreateUserRoleDto;
//# sourceMappingURL=create-user-role.dto.js.map