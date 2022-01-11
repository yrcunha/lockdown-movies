import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ReadRentMoviesDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  // id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  total_value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  returnDate: string;
}
