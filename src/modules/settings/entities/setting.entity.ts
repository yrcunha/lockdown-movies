import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings', { orderBy: { createdAt: 'DESC' } })
export class SettingEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('int', { name: 'turnaround_time', default: 1 })
  turnaroundTime: number;

  @Column('int', { name: 'fine', default: 10 })
  fine: number;

  @Column('boolean', { name: 'is_current', default: true })
  isCurrent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
