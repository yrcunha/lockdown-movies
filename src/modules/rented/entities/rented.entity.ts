import { MovieEntity } from 'src/modules/movies/entities/movies.entity';
import { SettingEntity } from 'src/modules/settings/entities/setting.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rented')
export class RentedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: UserEntity;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => MovieEntity)
  @JoinColumn({ name: 'movies_id', referencedColumnName: 'id' })
  movies: MovieEntity;

  @Column('uuid', { name: 'movies_id' })
  moviesId: string;

  @ManyToOne(() => SettingEntity)
  @JoinColumn({ name: 'settings_id', referencedColumnName: 'id' })
  settings: SettingEntity;

  @Column('uuid', { name: 'settings_id' })
  settingsId: string;

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
