import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';
import { IMoviesRepository } from './repositories/interfaces/IMoviesRepository';
import { MoviesRepository } from './repositories/implementations/MoviesRepository';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    {
      provide: IMoviesRepository,
      useClass: MoviesRepository,
    },
  ],
})
export class MoviesModule {}
