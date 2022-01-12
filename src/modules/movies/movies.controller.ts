import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from '../../labels/get-user.decorator';
import { Roles } from '../../labels/roles.decorator';
import { RolesGuard } from '../../labels/roles.guard';
import { CreateMoviesDto } from './dtos/create-movies.dto';
import { ReadMovieDto } from './dtos/read-movies.dto';
import { MoviesService } from './movies.service';

@Controller({ path: 'movies', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Movies')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse()
@ApiInternalServerErrorResponse()
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  /**
   * Obter todos os filmes
   */
  @Get()
  @ApiOperation({ summary: 'get movies' })
  @ApiOkResponse({ type: ReadMovieDto, isArray: true })
  getAllMovies(): Promise<Array<ReadMovieDto>> {
    return this.moviesService.getAllMovies();
  }

  /**
   * Criar um ou mais filmes
   * Cada filme deverá possuir:
   *    título,
   *    diretor,
   *    valor de locação e
   *    quantidade total de cópias
   * Para criar filmes o usuário deve ser administrador
   */
  @Post()
  @ApiOperation({ summary: 'register movies' })
  @ApiBody({ type: CreateMoviesDto, isArray: true })
  @ApiConflictResponse()
  @Roles()
  createMovies(
    @GetUser() userId: string,
    @Body() body: Array<CreateMoviesDto>,
  ): Promise<void> {
    return this.moviesService.createMovies(body);
  }
}
