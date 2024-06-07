import { Good } from 'src/goods/good.entity';
import { Job } from 'src/jobs/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Good, (goods) => goods.user, { eager: true })
  goods: Good[];
}
