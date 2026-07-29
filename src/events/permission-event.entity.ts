import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type PermissionType =
  | 'camera'
  | 'microphone'
  | 'geolocation'
  | 'notifications';

export type PermissionStatus = 'requested' | 'granted' | 'denied';

@Entity()
export class PermissionEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId?: number;

  @Column()
  sessionId: string;

  @Column()
  type: PermissionType;

  @Column()
  status: PermissionStatus;

  @Column()
  context: string;

  @CreateDateColumn()
  createdAt: Date;
}
