import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Admin@123',
    description:
      'Deve conter ao menos uma letra maiuscula, uma minuscula e um caractere especial',
    minLength: 8,
    maxLength: 32,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/, {
    message: 'password is too weak',
  })
  password: string;
}
