import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatedUserInfoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;
}
