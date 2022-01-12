import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from '../../labels/get-user.decorator';
import { Roles } from '../../labels/roles.decorator';
import { RolesGuard } from '../../labels/roles.guard';
import { UpdateSettingsDto } from './dtos/update-settings.dto';
import { SettingsService } from './settings.service';

@Controller({ path: 'settings', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Settings')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse()
@ApiInternalServerErrorResponse()
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  /**
   * Configurar tempos de:
   *    devolução em minutos
   *    multa em segundos
   * Para configurar os sistema o usuário deve ser administrador
   */
  @Put()
  @ApiOperation({ summary: 'set up return time and fine' })
  @ApiBadRequestResponse()
  @Roles()
  updateSettings(
    @GetUser() userId: string,
    @Body() body: UpdateSettingsDto,
  ): Promise<void> {
    return this.settingsService.updateSettings(body);
  }
}
