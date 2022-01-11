import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMoviesDto } from './dtos/create-movies.dto';
import { ReadMovieDto } from './dtos/read-movies.dto';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) {}

  async getAllMovies(): Promise<Array<ReadMovieDto>> {
    const found = this.moviesRepository
      .find({
        select: ['id', 'title', 'director', 'rentalValue', 'quantity'],
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    return found;
  }

  async getMoviesByIds(
    id: string[],
  ): Promise<
    Array<{ id: string; title: string; rentalValue: number; stock: number }>
  > {
    const query = this.moviesRepository.createQueryBuilder('movies');

    query.where(`quantity > 1 AND quantity > (stock + 1)`);
    query.andWhereInIds(id);

    if ((await query.getCount()) < id.length) {
      throw new NotFoundException(`the film cannot be rented`);
    }

    query.select([
      'movies.id',
      'movies.title',
      'movies.rentalValue',
      'movies.stock',
    ]);

    return await query.getMany();
  }

  createMovies(body: Array<CreateMoviesDto>): Promise<void> {
    return this.moviesRepository.createMovies(body);
  }

  async updatedStok(id: string[]) {
    return await this.moviesRepository
      .update(id, { stock: () => 'stock + 1' })
      .then((result) => {
        if (!result.affected) {
          throw new NotFoundException(`stock change error`);
        }
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }
}
