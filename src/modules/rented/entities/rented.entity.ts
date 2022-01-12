import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieEntity } from '../../movies/entities/movies.entity';
import { SettingEntity } from '../../settings/entities/setting.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('rented')
export class RentedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: UserEntity;

  @Column('uuid', { name: 'movies_id' })
  moviesId: string;

  @ManyToOne(() => MovieEntity)
  @JoinColumn({ name: 'movies_id', referencedColumnName: 'id' })
  movies: MovieEntity;

  @Column('uuid', { name: 'settings_id' })
  settingsId: string;

  @ManyToOne(() => SettingEntity)
  @JoinColumn({ name: 'settings_id', referencedColumnName: 'id' })
  settings: SettingEntity;

  @Column('timestamptz', { name: 'return_date' })
  returnDate: Date;

  @Column('varchar', { name: 'total_value', nullable: true, length: 128 })
  totalValue: number;

  @Column('boolean', { name: 'was_returned', default: false })
  wasReturned: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
