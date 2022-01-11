import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMinutes, differenceInSeconds } from 'date-fns';
import { MoviesService } from '../movies/movies.service';
import { SettingsService } from '../settings/settings.service';
import { CreateRentMoviesDto } from './dtos/create-rent-movies.dto';
import { ReadRentMoviesDto } from './dtos/read-rent-movies.dto';
import { RentedRepository } from './rented.repository';

@Injectable()
export class RentedService {
  constructor(
    @InjectRepository(RentedRepository)
    private rentedRepository: RentedRepository,

    private moviesService: MoviesService,
    private settingsService: SettingsService,
  ) {}

  async rentMovies(
    userId: string,
    body: Array<string>,
  ): Promise<Array<ReadRentMoviesDto>> {
    const newRentMovie: Array<CreateRentMoviesDto> = [];
    const viewRentMovie: Array<ReadRentMoviesDto> = [];

    const { id: settingsId, turnaroundTime } =
      await this.settingsService.getCurrentSetting();

    const returnDate = addMinutes(new Date(), turnaroundTime);

    const moviesIds = await this.moviesService.getMoviesByIds(body);
    await this.moviesService.updatedStok(body);

    for (const key in moviesIds) {
      newRentMovie.push({
        moviesId: moviesIds[key].id,
        userId: userId,
        settingsId: settingsId,
        returnDate,
      });

      viewRentMovie.push({
        title: moviesIds[key].title,
        total_value: `R$ ${moviesIds[key].rentalValue
          .toFixed(2)
          .toLocaleString()}`,
        returnDate: returnDate.toLocaleString(),
      });
    }

    await this.rentedRepository.rentMovies(newRentMovie);

    return viewRentMovie;
  }

  async returnMovies(userId: string): Promise<{ value_total: string }> {
    const valueTotal: number[] = [];

    const query = this.rentedRepository.createQueryBuilder('rented');
    query.leftJoinAndSelect('rented.movies', 'movies');
    query.leftJoinAndSelect('rented.settings', 'settings');
    query.where(`user_id = :userId AND was_returned = false`, { userId });

    if ((await query.getCount()) <= 0) {
      throw new NotFoundException(`there are no films to be returned`);
    }

    query.update().set({ wasReturned: true }).execute();

    query.select([
      'rented.id',
      'rented.returnDate',
      'movies.title',
      'movies.rentalValue',
      'settings.turnaroundTime',
      'settings.fine',
    ]);

    const rentedMovies = await query.getMany();
    const dateDevolution = new Date();

    for (const key in rentedMovies) {
      const differSeconds = differenceInSeconds(
        dateDevolution,
        rentedMovies[key].returnDate,
      );

      const { turnaroundTime, fine } = rentedMovies[key].settings;

      const finingTime = (differSeconds - turnaroundTime * 60) / fine;
      const percentage = finingTime / fine / 10;

      const { rentalValue } = rentedMovies[key].movies;
      const finingValue = rentalValue * percentage;
      const value = rentalValue + finingValue;

      valueTotal.push(parseInt(value.toFixed(2)));
    }

    const total = valueTotal.reduce((total, numero) => {
      return total + numero;
    });

    return { value_total: `R$ ${total.toFixed(2).toLocaleString()}` };
  }
}
