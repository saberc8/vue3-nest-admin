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
exports.InitDbService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../api/user/entities/user.entity");
const user_service_1 = require("../../api/user/user.service");
let InitDbService = class InitDbService {
    constructor(userEntity, configService, userService) {
        this.userEntity = userEntity;
        this.configService = configService;
        this.userService = userService;
    }
    onModuleInit() {
        this.initData();
    }
    async initData() {
        var _a, _b, _c;
        const username = (_a = this.configService.get('user.username')) !== null && _a !== void 0 ? _a : 'admin';
        const password = (_b = this.configService.get('user.password')) !== null && _b !== void 0 ? _b : '123456';
        const nickname = (_c = this.configService.get('user.nickname')) !== null && _c !== void 0 ? _c : 'admin';
        const user = await this.userEntity.findOne({
            where: {
                username,
            },
        });
        if (!user) {
            await this.userService.create({
                username,
                password,
                nickname,
                confirmPassword: password,
            });
            console.log('初始化用户成功');
        }
        else {
            console.log('初始化用户已存在');
            console.log(user);
        }
    }
};
InitDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        user_service_1.UserService])
], InitDbService);
exports.InitDbService = InitDbService;
//# sourceMappingURL=init-db.service.js.map