import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class AcessTokenDto {
  @ApiProperty()
  @IsJWT()
  acessToken: string;
}
