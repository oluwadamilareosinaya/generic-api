import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Tag } from '../tag.enum';

export class CreateGoodDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(Tag)
  @IsString()
  tag: Tag;
}
