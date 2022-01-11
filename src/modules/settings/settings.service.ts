import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadSettingDto } from './dtos/read-settings.dto';
import { UpdateSettingsDto } from './dtos/update-settings.dto';
import { SettingsRepository } from './settings.repository';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsRepository)
    private rentedRepository: SettingsRepository,
  ) {}

  async getCurrentSetting(): Promise<ReadSettingDto> {
    const found = await this.rentedRepository.findOne({
      where: { isCurrent: true },
      select: ['id', 'turnaroundTime', 'fine'],
    });

    if (!found) {
      throw new InternalServerErrorException(`Settings not found`);
    }

    return found;
  }

  async getSettingById(id: string) {
    return this.rentedRepository
      .findOneOrFail(id, { select: ['turnaroundTime', 'fine'] })
      .catch((error) => {
        throw new NotFoundException(error.message);
      });
  }

  async createSetting(turnaroundTime: number, fine: number): Promise<void> {
    return this.rentedRepository.createSetting(turnaroundTime, fine);
  }

  async updateSettings(body: UpdateSettingsDto): Promise<void> {
    let { turnaroundTime, fine } = body;

    const conditions =
      !turnaroundTime && !fine
        ? 1
        : !turnaroundTime && fine
        ? 2
        : turnaroundTime && !fine
        ? 3
        : 4;

    switch (conditions) {
      case 1: {
        throw new BadRequestException(`No values to be updated`);
      }
      case 2:
      case 3:
      case 4: {
        const {
          id,
          turnaroundTime: foundTurnaroundTime,
          fine: foundFine,
        } = await this.getCurrentSetting();

        turnaroundTime =
          turnaroundTime == undefined || turnaroundTime == null
            ? foundTurnaroundTime
            : turnaroundTime;

        fine = fine == undefined || fine == null ? foundFine : fine;

        await this.rentedRepository
          .update(id, { isCurrent: false })
          .then(async (result) => {
            if (!result.affected) {
              throw new InternalServerErrorException(`Settings not updated`);
            }

            await this.createSetting(turnaroundTime, fine);

            return true;
          })
          .catch((error) => {
            throw new InternalServerErrorException(error.message);
          });
      }
    }
  }
}
