import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodDto } from './create-good.dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterGoodDto extends PartialType(CreateGoodDto) {
  @IsString()
  @IsOptional()
  search: string;
}
