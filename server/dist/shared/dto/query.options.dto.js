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
exports.QueryOptionsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class QueryOptionsDto {
}
__decorate([
    (0, class_validator_1.Min)(1, { message: 'pageSize最小值为1' }),
    (0, class_validator_1.IsInt)({ message: 'pageSize必须是数字' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryOptionsDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'pageNumber最小值为1' }),
    (0, class_validator_1.IsInt)({ message: 'pageNumber必须是数字' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryOptionsDto.prototype, "pageNumber", void 0);
exports.QueryOptionsDto = QueryOptionsDto;
//# sourceMappingURL=query.options.dto.js.map