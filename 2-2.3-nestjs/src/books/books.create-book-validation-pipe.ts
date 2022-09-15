import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { CreateBookDto } from './dto/create-book.dto'

@Injectable()
export class CreateBookValidationPipe implements PipeTransform<any, Promise<CreateBookDto>> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<CreateBookDto> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const case1Errors = await validate(object, { groups: ['singleAuthor'] });
    const case2Errors = await validate(object, { groups: ['multipleAuthors'] });

    if (case1Errors.length > 0 && case2Errors.length > 0) {
      throw new BadRequestException('Create book data is not valid!');
    }

    return value as CreateBookDto;
  }

  private toValidate(metatype: Function): boolean {
    return metatype === CreateBookDto;
  }
}
