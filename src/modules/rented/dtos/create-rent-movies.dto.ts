import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRentMoviesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  moviesId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  settingsId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  returnDate: Date;
}
