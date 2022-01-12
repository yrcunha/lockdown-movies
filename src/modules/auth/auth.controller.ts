import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../../labels/roles.decorator';
import { RolesGuard } from '../../labels/roles.guard';
import { AuthService } from './auth.service';
import { AcessTokenDto } from './dtos/acess-token.dto';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
@ApiInternalServerErrorResponse()
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Deverá ser possível cadastrar um usuário no sistema
   * Username será único
   */
  @Post('signup')
  @ApiOperation({ summary: 'register in the system' })
  @ApiOkResponse()
  @ApiConflictResponse()
  signUp(@Body() body: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('signin')
  @ApiOperation({ summary: 'log in' })
  @ApiOkResponse({ type: AcessTokenDto })
  @ApiUnauthorizedResponse()
  signIn(@Body() body: AuthCredentialsDto): Promise<AcessTokenDto> {
    return this.authService.signIn(body);
  }

  @Post('me')
  @ApiOperation({
    summary: 'route to test user feedback in the context of the request',
  })
  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  me(@Req() req) {
    return req.user;
  }
}
