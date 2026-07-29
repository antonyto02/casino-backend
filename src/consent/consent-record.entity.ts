import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

@Entity()
export class ConsentRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId?: number;

  @Column()
  sessionId: string;

  @Column()
  category: ConsentCategory;

  @Column()
  accepted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
