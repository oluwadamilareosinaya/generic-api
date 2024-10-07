import { Good } from 'src/goods/good.entity';
import { Job } from 'src/jobs/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany((_type) => Good, (goods) => goods.user, {
    eager: true,
    nullable: true,
  })
  goods: Good[];

  @OneToMany((_type) => Job, (jobs) => jobs.user, {
    eager: true,
    nullable: true,
  })
  jobs: Job[];
}
