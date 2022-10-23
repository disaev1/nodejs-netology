import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class CreateBookValidationPipe implements PipeTransform<any, Promise<CreateUserDto>> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<CreateUserDto> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Signup data is not valid!');
    }

    return value as CreateUserDto;
  }

  private toValidate(metatype: Function): boolean {
    return metatype === CreateUserDto;
  }
}
