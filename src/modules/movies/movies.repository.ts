import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMoviesDto } from './dtos/create-movies.dto';
import { MovieEntity } from './entities/movies.entity';

@EntityRepository(MovieEntity)
export class MoviesRepository extends Repository<MovieEntity> {
  async createMovies(body: Array<CreateMoviesDto>): Promise<void> {
    const movies = this.create(body);
    await this.save(movies).catch((error) => {
      if (error.code == 23505) {
        throw new ConflictException(`Movie already exists`);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    });
  }
}
