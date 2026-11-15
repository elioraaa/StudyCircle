import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;
}