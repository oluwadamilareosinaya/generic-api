import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.enum';

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
}
