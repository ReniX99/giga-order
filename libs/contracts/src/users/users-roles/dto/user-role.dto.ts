import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UserRoleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsPositive()
  roleId: number;
}
