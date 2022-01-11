import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/labels/get-user.decorator';
import { ReadRentMoviesDto } from './dtos/read-rent-movies.dto';
import { RentedService } from './rented.service';

@Controller({ path: 'rented', version: '1' })
@UseGuards(AuthGuard('jwt'))
@ApiTags('Rented')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse()
@ApiInternalServerErrorResponse()
export class RentedController {
  constructor(private rentedService: RentedService) {}

  /**
   * Obter filmes alugados
   */

  /**
   * Aluguel de filmes
   * Deverá ser possível alugar um ou mais filmes.
   * Manter um no estoque
   * Retornar:
   *    título de cada filme,
   *    valor total da locação e
   *    data/hora de devolução;
   * Não tendo cópias não deve concluir a transação
   */
  @Post()
  @ApiOperation({ summary: 'rent movies' })
  @ApiBody({
    isArray: true,
    schema: { type: 'array', items: { title: 'id', format: 'uuid' } },
  })
  @ApiOkResponse({ type: ReadRentMoviesDto })
  rentMovies(
    @GetUser('id') userId: string,
    @Body() body: Array<string>,
  ): Promise<Array<ReadRentMoviesDto>> {
    return this.rentedService.rentMovies(userId, body);
  }

  /**
   * Devolver filmes alugados
   * Os filmes devolvidos voltam ao estoque
   * Retornar:
   *    valor total a ser pago;
   * O valor total é baseado no valor da locação mais a multa em 10%
   * Um filme só poderá ser devolvido pelo mesmo usuário que fez a locação.
   */
  @Put()
  @ApiOperation({ summary: 'return rented movie' })
  @ApiBody({
    schema: { title: 'value_total', format: 'string' },
  })
  returnMovies(
    @GetUser('id') userId: string,
  ): Promise<{ value_total: string }> {
    return this.rentedService.returnMovies(userId);
  }
}
