import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateSettingsDto } from './update-settings.dto';

export class ReadSettingDto extends PartialType(UpdateSettingsDto) {
  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
