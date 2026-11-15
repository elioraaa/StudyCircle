import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseCode: string;

  @Column()
  topic: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 6 })
  maxSize: number;

  @Column({ default: 'online' })
  mode: string;

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(() => User, (user) => user.groups, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;
}