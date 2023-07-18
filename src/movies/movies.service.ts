import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchMoviesRequestDto } from './dtos/search-movies-request.dto';
import { SearchMoviesResponseDto } from './dtos/search-movies-response.dto';
import { errors } from './movies.error';
import { FindMovieRequestDto } from './dtos/find-movie-request.dto';
import { FindMovieResponseDto } from './dtos/find-movie-response.dto';
import { IMoviesRepository } from './repositories/interfaces/IMoviesRepository';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: IMoviesRepository) {}

  async search({
    query,
    page = 1,
  }: SearchMoviesRequestDto): Promise<SearchMoviesResponseDto> {
    const data = await this.moviesRepository.search(query, page);

    if (data.Response === 'False') {
      return {
        search: query,
        page,
        movies: [],
        totalResults: 0,
      };
    }

    return {
      movies: data.Search.map((movie) => ({
        title: movie.Title,
        imdbId: movie.imdbID,
        poster: movie.Poster === 'N/A' ? null : movie.Poster,
      })),
      search: query,
      page,
      totalResults: parseInt(data.totalResults),
    };
  }

  async findMovie({
    imdbID,
  }: FindMovieRequestDto): Promise<FindMovieResponseDto> {
    const data = await this.moviesRepository.findMovie(imdbID);

    if (data.Response === 'False') {
      throw new NotFoundException(errors.MOVIES_NOT_FOUND);
    }

    return {
      title: data.Title,
      imdbId: data.imdbID,
      poster: data.Poster === 'N/A' ? null : data.Poster,
      actors: data.Actors.split(', '),
      rating: parseFloat(data.imdbRating),
      released: data.Released,
      runtime: data.Runtime,
      genres: data.Genre.split(', '),
      director: data.Director,
      plot: data.Plot,
    };
  }
}
