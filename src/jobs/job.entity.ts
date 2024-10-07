import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne((_type) => User, (user) => user.jobs, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
