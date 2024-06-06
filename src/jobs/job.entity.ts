import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  industry: string;

  @Column()
  employment_type: string;

  @Column()
  salary_range: string;

  @Column()
  description: string;

  @Column()
  company_bio: string;

  @Column()
  job_url: string;

  @Column()
  logo_image: string;

  @Column()
  banner_image: string;

  @Column()
  location: string;

  @Column()
  role: string;

  @Column()
  experience: string;

  @Column()
  requirement: string;

  @Column()
  responsibility: string;

  @Column()
  social_links: string;

  @Column()
  company_name: string;

  @Column()
  hr_name: string;

  @Column()
  employee_count: string;
}
