import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Good {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  tag: Tag;

  @ManyToOne((_type) => User, (user) => user.goods, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
