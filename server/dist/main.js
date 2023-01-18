"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const utils_1 = require("./utils");
exports.config = (0, utils_1.getConfig)();
const PORT = exports.config.PORT || 4000;
const PREFIX = exports.config.PREFIX || '/';
async function bootstrap() {
    const logger = new common_1.Logger('main.ts');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: utils_1.IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
    });
    app.enableCors();
    app.setGlobalPrefix(PREFIX);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('rbac api')
        .setDescription('The rbac API description')
        .setVersion('1.0')
        .addTag('rbac')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    logger.log(`Document running on http://localhost:${PORT}/docs`);
    await app.listen(PORT, () => {
        logger.log(`Server running on http://localhost:${PORT}/${PREFIX}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map