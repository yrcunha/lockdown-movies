import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.usersRepository
      .findOneOrFail({ where: { username }, select: ['id'] })
      .catch(() => {
        throw new UnauthorizedException(`Please check your login credentials`);
      });

    return user;
  }

  async getPasswordUser(id: string): Promise<string> {
    const user = await this.usersRepository
      .findOneOrFail(id, { select: ['password'] })
      .catch(() => {
        throw new UnauthorizedException(`Please check your login credentials`);
      });

    return user.password;
  }

  async createUser(body: CreateUserDto): Promise<void> {
    return this.usersRepository.createUser(body);
  }
}
