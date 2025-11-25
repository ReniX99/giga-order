import { IsNumber, IsPositive } from 'class-validator';

export class DeleteProductDto {
  @IsNumber()
  @IsPositive()
  id: number;
}
