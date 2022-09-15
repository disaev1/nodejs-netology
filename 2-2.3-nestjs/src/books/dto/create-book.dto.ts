import { IsString, IsDefined, IsArray, IsOptional, ArrayNotEmpty} from 'class-validator';

export class CreateBookDto {
  @IsString({ always: true })
  @IsDefined({ always: true })
  title: string;

  @IsString({ always: true })
  @IsOptional({ always: true })
  description?: string;

  @IsArray({ groups: ['multipleAuthors'] })
  @ArrayNotEmpty({ groups: ['multipleAuthors'] })
  @IsString({ groups: ['singleAuthor'] })
  authors: string[] | string;

  @IsString({ always: true })
  @IsOptional({ always: true })
  favourite?: string;

  @IsString({ always: true })
  @IsOptional({ always: true })
  fileCover?: string;

  @IsString({ always: true })
  @IsOptional({ always: true })
  fileName?: string;

  @IsString({ always: true })
  @IsOptional({ always: true })
  fileBook?: string;
}
