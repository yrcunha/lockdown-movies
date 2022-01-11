import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRentMoviesDto } from './dtos/create-rent-movies.dto';
import { RentedEntity } from './entities/rented.entity';

@EntityRepository(RentedEntity)
export class RentedRepository extends Repository<RentedEntity> {
  async rentMovies(data: Array<CreateRentMoviesDto>): Promise<void> {
    const rentMovies = this.create(data);

    await this.save(rentMovies).catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }
}
