import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  landmark: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
