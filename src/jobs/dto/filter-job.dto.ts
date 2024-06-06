import { IsOptional, IsString } from 'class-validator';

export class FilterJobDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  industry: string;

  @IsOptional()
  @IsString()
  employment_type: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  role: string;
}
