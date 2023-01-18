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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const find_menu_dto_1 = require("./dto/find-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    add(createMenuDto) {
        return this.menuService.add(createMenuDto);
    }
    updateMenu(data) {
        return this.menuService.updateMenu(data);
    }
    getMenuList(findMenuDto) {
        return this.menuService.getMenuList(findMenuDto);
    }
    deleteMenu(findMenuDto) {
        console.log(findMenuDto, 'findMenuDto');
        return this.menuService.deleteMenu(findMenuDto);
    }
};
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "add", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_menu_dto_1.FindMenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuList", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_menu_dto_1.FindMenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "deleteMenu", null);
MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map