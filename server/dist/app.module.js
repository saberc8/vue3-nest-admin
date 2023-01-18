"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const api_module_1 = require("./api/api.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const validation_pipe_1 = require("./pipe/validation.pipe");
const auth_guard_1 = require("./guard/auth.guard");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const utils_1 = require("./utils");
const shared_module_1 = require("./shared/shared.module");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const tasks_module_1 = require("./schedule/tasks.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: false,
                isGlobal: true,
                load: [utils_1.getConfig],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    var _a;
                    return ({
                        type: 'mysql',
                        host: String(configService.get('datasource.host')),
                        port: Number.parseInt((_a = configService.get('datasource.port')) !== null && _a !== void 0 ? _a : '3306'),
                        username: String(configService.get('datasource.username')),
                        password: String(configService.get('datasource.password')),
                        database: String(configService.get('datasource.database')),
                        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
                        synchronize: true,
                    });
                },
            }),
            api_module_1.ApiModule,
            shared_module_1.SharedModule,
            schedule_1.ScheduleModule.forRoot(),
            tasks_module_1.TasksModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useClass: validation_pipe_1.ValidationPipe,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map