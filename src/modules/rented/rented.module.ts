import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../movies/entities/movies.entity';
import { MoviesModule } from '../movies/movies.module';
import { SettingEntity } from '../settings/entities/setting.entity';
import { SettingsModule } from '../settings/settings.module';
import { UserEntity } from '../users/entities/user.entity';
import { RentedController } from './rented.controller';
import { RentedRepository } from './rented.repository';
import { RentedService } from './rented.service';

@Module({
  imports: [
    MoviesModule,
    SettingsModule,
    TypeOrmModule.forFeature([
      RentedRepository,
      UserEntity,
      MovieEntity,
      SettingEntity,
    ]),
  ],
  providers: [RentedService],
  controllers: [RentedController],
})
export class RentedModule {}
