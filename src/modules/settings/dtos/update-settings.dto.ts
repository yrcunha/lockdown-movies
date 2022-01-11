import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty({ default: 1 })
  @IsOptional()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  turnaroundTime: number;

  @ApiProperty({ default: 10 })
  @IsOptional()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  fine: number;
}
