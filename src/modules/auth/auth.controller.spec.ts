import { Test } from '@nestjs/testing';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let mockUser: CreateUserDto;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  const mockUsersService = {
    getUserByUsername: jest.fn(),
    getPasswordUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    mockUser = { username: 'Admin', password: 'Admin@123' };
  });

  beforeEach(() => {
    mockAuthService.signIn.mockReset();
  });

  describe('when login', () => {
    it('should authentication user and return an authentication token', async () => {
      mockAuthService.signIn.mockReturnValue({ acessToken: 'valid_token' });

      const user = {
        username: mockUser.username,
        password: mockUser.password,
      };

      const result = await authController.signIn(user);

      expect(result).toHaveProperty('acessToken', 'valid_token');
      expect(mockAuthService.signIn).toBeCalledTimes(1);
    });
  });
});
