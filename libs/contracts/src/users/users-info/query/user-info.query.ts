import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

const transformToNumber = (value: any) =>
  typeof value === 'string'
    ? Number(value)
    : typeof value === 'number'
      ? value
      : undefined;

export class UserInfoQuery {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @Transform(({ value }) => transformToNumber(value))
  @IsInt()
  @IsOptional()
  @IsPositive()
  page?: number;

  @Transform(({ value }) => transformToNumber(value))
  @IsInt()
  @IsOptional()
  @IsPositive()
  count?: number;
}
