"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MenuModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const menu_service_1 = require("./menu.service");
const menu_controller_1 = require("./menu.controller");
const menu_entity_1 = require("./entities/menu.entity");
let MenuModule = MenuModule_1 = class MenuModule {
};
MenuModule = MenuModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '',
                    module: MenuModule_1,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([menu_entity_1.MenuEntity]),
        ],
        controllers: [menu_controller_1.MenuController],
        providers: [menu_service_1.MenuService],
    })
], MenuModule);
exports.MenuModule = MenuModule;
//# sourceMappingURL=menu.module.js.map