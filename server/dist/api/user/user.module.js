"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("../role/entities/role.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let UserModule = UserModule_1 = class UserModule {
};
UserModule = UserModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '',
                    module: UserModule_1,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, role_entity_1.RoleEntity]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    secret: config.get('jwt.secretkey'),
                    signOptions: {
                        expiresIn: config.get('jwt.expiresin'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map