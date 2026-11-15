import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  major: string;

  @Column({ nullable: true })
  year: number;

  @Column({ default: 'student' })
  role: string;

  @OneToMany(() => Group, (group) => group.owner)
  groups: Group[];

  @CreateDateColumn()
  createdAt: Date;
}