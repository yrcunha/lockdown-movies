import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let mockUsers: CreateUserDto;

  const mockUsersRepository = {
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    usersService = moduleRef.get<UsersService>(UsersService);
    mockUsers = {
      username: 'Admin',
      password: 'Admin@123',
    };
  });

  it('should be defined the UsersService', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });
});
