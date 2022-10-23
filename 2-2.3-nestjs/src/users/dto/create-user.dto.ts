import { IsString, IsDefined, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
