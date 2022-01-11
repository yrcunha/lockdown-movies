import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateMoviesDto } from './create-movies.dto';

export class ReadMovieDto extends PartialType(CreateMoviesDto) {
  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
