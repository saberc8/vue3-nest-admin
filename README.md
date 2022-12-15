## 基于 vue3+nestjs 实现的 rbac 后台管理系统

### 项目介绍

- server 服务端
- web 前端
  [DTO entity](https://zhuanlan.zhihu.com/p/296492029)

### 项目运行

# nest.js 请求生命周期

==============================
客户端请求
|----------------生命周期开始
全局中间件
|
模块中间件
|
全局守卫
|
控制器守卫
|
路由守卫
|
全局拦截器(return next.handle().pip(...) 前的逻辑)
|
控制器拦截器(return next.handle().pip(...) 前的逻辑)
|
路由拦截器(return next.handle().pip(...) 前的逻辑)
|
全局管道
|
控制器管道
|
路由管道
|
路由参数管道
|
控制器(控制器内的业务代码逻辑)
|
服务(控制器内如使用 service,跑 service 的逻辑)
|
控制器准备响应(控制器 return/void)
|
路由拦截器(return next.handle().pip(...) 内的逻辑)
|
控制器拦截器(return next.handle().pip(...) 内的逻辑)
|
全局拦截器(return next.handle().pip(...) 内的逻辑)
|
异常过滤器(过滤器只用来做异常处理的,所以叫异常拦截器)
|
服务器响应----------------此次请求的生命周期结束

## 中间件 MiddleWare

```
中间件 MiddleWare
  特点：和 koa2的洋葱模型一样, 处理 next() 前 的业务
可以执行以下任务:
  1.执行任何代码
  2.对请求和响应对象进行更改。
  3.结束请求-响应周期。
  4.调用堆栈中的下一个中间件函数。
  5.如果当前的中间件功能没有结束请求-响应周期，
  则必须调用 `next()` 将控制权传递给下一个中间件功能。否则，该请求将被挂起。
```

## 守卫 Guard

```
守卫 Guard, 主要用来作 权限、角色、ACL控制的业务
```

## 拦截器 Interceptor

```
拦截器 Interceptor
  特点：和 koa2的洋葱模型一样, `return next.handle().pipe(...)` 前+后 的逻辑都能完成不同的业务
受面向方面编程（AOP）技术的启发, 可以做下面等操作：
  1.在方法执行之前/之后绑定额外的逻辑
  2.转换从函数返回的结果
  3.转换从函数引发的异常
  4.扩展基本功能行为
  5.根据特定条件完全覆盖功能
```

## 管道 Pipe

```
管道Pipe 主要用处：
  1.转换：将输入数据转换为所需的形式（例如，从字符串到整数）
  2.验证：评估输入数据，如果有效，只需将其原样传递即可；否则，当数据不正确时抛出异常
```

## 异常过滤器 Filter

```
异常过滤器 Filter 正如其名,做异常拦截处理的

参考实现:
/**
 * 异常过滤器
 * 往往用于全局
 * 功能:
 *  1.在程序出口处拦截所有异常,可对特定异常做记录
 *  2.统一异常的格式
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    // 加入自己的异常处理逻辑
    // 对于自定义异常,需要写入错误码
    const errorCode = exception.response.errorCode || 10000000
    const message = exception.message || 'error'

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        request: `${request.method} ${request.path}`,
        message,
        errorCode
      })
  }
}
```
