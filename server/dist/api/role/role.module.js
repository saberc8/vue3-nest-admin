"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RoleModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const role_service_1 = require("./role.service");
const role_controller_1 = require("./role.controller");
const role_entity_1 = require("./entities/role.entity");
const menu_entity_1 = require("../menu/entities/menu.entity");
let RoleModule = RoleModule_1 = class RoleModule {
};
RoleModule = RoleModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '',
                    module: RoleModule_1,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([role_entity_1.RoleEntity, menu_entity_1.MenuEntity]),
        ],
        controllers: [role_controller_1.RoleController],
        providers: [role_service_1.RoleService],
    })
], RoleModule);
exports.RoleModule = RoleModule;
//# sourceMappingURL=role.module.js.map