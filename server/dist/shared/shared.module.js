"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const init_db_service_1 = require("./services/init-db.service");
const user_service_1 = require("../api/user/user.service");
const menu_service_1 = require("../api/menu/menu.service");
const user_entity_1 = require("../api/user/entities/user.entity");
const role_entity_1 = require("../api/role/entities/role.entity");
const menu_entity_1 = require("../api/menu/entities/menu.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, role_entity_1.RoleEntity, menu_entity_1.MenuEntity]),
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
        providers: [init_db_service_1.InitDbService, user_service_1.UserService, menu_service_1.MenuService],
        exports: [init_db_service_1.InitDbService, user_service_1.UserService, menu_service_1.MenuService],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map