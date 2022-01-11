import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMoviesDto {
  @ApiProperty({ example: 'Jurassic Park' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Steven Spielberg' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  director: string;

  @ApiProperty({ example: 1.11, format: 'float' })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  rentalValue: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  quantity: number;
}
