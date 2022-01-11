import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RentMoviesIdsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
