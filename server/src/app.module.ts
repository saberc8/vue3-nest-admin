import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiModule } from './api/api.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ValidationPipe } from './pipe/validation.pipe'
import { AuthGuard } from './guard/auth.guard'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { getConfig } from './utils'
import { SharedModule } from './shared/shared.module'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE, APP_GUARD } from '@nestjs/core'

import { ScheduleModule } from '@nestjs/schedule'
import { TasksModule } from './schedule/tasks.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      load: [getConfig], // 加载配置文件
    }),
    // mysql的连接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: String(configService.get('datasource.host')),
        port: Number.parseInt(configService.get('datasource.port') ?? '3306'),
        username: String(configService.get('datasource.username')),
        password: String(configService.get('datasource.password')),
        database: String(configService.get('datasource.database')),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: true,
      }),
    }),
    ApiModule,
    SharedModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局使用管道(数据校验)
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard, //就是这个权限的守卫 写在提供者里面
    },
    // 全局使用过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // 全局使用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
