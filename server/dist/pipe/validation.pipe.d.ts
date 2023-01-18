import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
}
