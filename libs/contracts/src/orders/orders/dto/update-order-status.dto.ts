import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsInt()
  @IsPositive()
  statusId: number;
}

export class UpdateOrderStatusMicroserviceDto extends UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
