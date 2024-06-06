import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EmploymentType } from '../jobs-enums.enum';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  industry: string;

  @IsNotEmpty()
  @IsString()
  salary_range: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  company_bio: string;

  @IsNotEmpty()
  @IsString()
  job_url: string;

  @IsNotEmpty()
  @IsString()
  logo_image: string;

  @IsNotEmpty()
  @IsString()
  banner_image: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  requirement: string;

  @IsNotEmpty()
  @IsString()
  responsibility: string;

  @IsNotEmpty()
  @IsString()
  social_links: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  hr_name: string;

  @IsNotEmpty()
  @IsString()
  employee_count: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EmploymentType)
  employment_type: EmploymentType;
}
