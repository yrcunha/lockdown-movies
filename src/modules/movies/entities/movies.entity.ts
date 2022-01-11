import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('varchar', { name: 'title', unique: true, length: 100 })
  title: string;

  @Column('varchar', { name: 'director', length: 100 })
  director: string;

  @Column('float', { name: 'rental_value' })
  rentalValue: number;

  @Column('int', { name: 'quantity', default: 1 })
  quantity: number;

  @Column('int', { name: 'stock', default: 0 })
  stock: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
