import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMoviesDto } from './dtos/create-movies.dto';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';

describe('AuthService', () => {
  let moviesService: MoviesService;
  let moviesRepository: MoviesRepository;
  let mockMovies: CreateMoviesDto;

  const mockMoviesRepository = {
    createMovies: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(MoviesRepository),
          useValue: mockMoviesRepository,
        },
      ],
    }).compile();

    moviesRepository = moduleRef.get<MoviesRepository>(MoviesRepository);
    moviesService = moduleRef.get<MoviesService>(MoviesService);
    mockMovies = {
      title: 'Jurassic Park',
      director: 'Steven Spielber',
      rentalValue: 10.55,
      quantity: 10,
    };
  });

  it('should be defined the moviesservice', () => {
    expect(moviesService).toBeDefined();
    expect(moviesRepository).toBeDefined();
  });
});
