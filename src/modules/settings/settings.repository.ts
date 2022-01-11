import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SettingEntity } from './entities/setting.entity';

@EntityRepository(SettingEntity)
export class SettingsRepository extends Repository<SettingEntity> {
  async createSetting(turnaroundTime: number, fine: number) {
    const setting = this.create({ turnaroundTime, fine });

    await this.save(setting).catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
    return;
  }
}
