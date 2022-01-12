import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoviesService } from '../movies/movies.service';
import { SettingsService } from '../settings/settings.service';
import { CreateRentMoviesDto } from './dtos/create-rent-movies.dto';
import { RentedRepository } from './rented.repository';
import { RentedService } from './rented.service';

describe('AuthService', () => {
  let rentedService: RentedService;
  let rentedRepository: RentedRepository;
  let mockRented: CreateRentMoviesDto;

  const mockMoviesService = {
    getMoviesByIds: jest.fn(),
    updatedStok: jest.fn(),
  };

  const mockSettingsService = {
    getCurrentSetting: jest.fn(),
  };

  const mockRentedRepository = {
    rentMovies: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RentedService,
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: SettingsService, useValue: mockSettingsService },
        {
          provide: getRepositoryToken(RentedRepository),
          useValue: mockRentedRepository,
        },
      ],
    }).compile();

    rentedRepository = moduleRef.get<RentedRepository>(RentedRepository);
    rentedService = moduleRef.get<RentedService>(RentedService);
    mockRented = {
      userId: '1',
      moviesId: '1',
      settingsId: '1',
      returnDate: new Date(),
    };
  });

  it('should be defined the rentedservice', () => {
    expect(rentedService).toBeDefined();
    expect(rentedRepository).toBeDefined();
  });
});
