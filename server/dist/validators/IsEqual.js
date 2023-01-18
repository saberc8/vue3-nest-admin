"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEqual = void 0;
const class_validator_1 = require("class-validator");
function IsEqual(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isEqual',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return (typeof value === 'string' && typeof relatedValue === 'string' && value === relatedValue);
                },
                defaultMessage() {
                    return '两次密码不一致';
                },
            },
        });
    };
}
exports.IsEqual = IsEqual;
//# sourceMappingURL=IsEqual.js.map