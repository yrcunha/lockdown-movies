import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UsersRepository;
  let mockUser: CreateUserDto;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  const mockUsersService = {
    getUserByUsername: jest.fn(),
    getPasswordUser: jest.fn(),
    createUser: jest.fn(),
  };

  const mockUsersRepository = {
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UsersRepository>(UsersRepository);
    authService = moduleRef.get<AuthService>(AuthService);
    mockUser = { username: 'Admin', password: 'Admin@123' };
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
