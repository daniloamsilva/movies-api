import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  search(@Query('query') query: string, @Query('page') page: number) {
    return this.moviesService.search({
      query,
      page,
    });
  }

  @Get(':id')
  findMovie(@Param('id') id: string) {
    return this.moviesService.findMovie({ imdbID: id });
  }
}
