import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata, 'vm')
    const { metatype } = metadata
    // 如果没有传入验证规则，则不验证，直接返回数据
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]
      // 统一抛出异常
      throw new HttpException({ message: msg }, HttpStatus.OK)
    } else {
      Logger.log(errors, 'ValidationPipe中错误')
    }
    return value
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
