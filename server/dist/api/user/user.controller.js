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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_login_dto_1 = require("./dto/user-login.dto");
const find_user_dto_1 = require("./dto/find-user.dto");
const find_user_role_dto_1 = require("./dto/find-user-role.dto");
const user_entity_1 = require("./entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async add(createUserDto) {
        return await this.userService.create(createUserDto);
    }
    async login(userLoginDto) {
        return await this.userService.login(userLoginDto);
    }
    async getUserInfo(data) {
        return await this.userService.findUserInfo(data);
    }
    async getUserList(findUserDto) {
        return await this.userService.findUserList(findUserDto);
    }
    async findUserRole(data) {
        return await this.userService.findUserRole(data);
    }
    async saveUserRole(data) {
        console.log(data);
        return await this.userService.saveUserRole(data);
    }
    async initDatabase() {
        return await this.userService.initDatabase();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更改用户可用状态' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "add", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('getUserInfo'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.FindUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.FindUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, common_1.Get)('findUserRole'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_role_dto_1.FindUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserRole", null);
__decorate([
    (0, common_1.Post)('saveUserRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_role_dto_1.FindUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "saveUserRole", null);
__decorate([
    (0, common_1.Post)('initDatabase'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "initDatabase", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('用户账号'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiExtraModels)(user_entity_1.UserEntity),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map