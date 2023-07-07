import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SearchMoviesRequestDto } from './dtos/search-movies-request.dto';
import { firstValueFrom } from 'rxjs';
import { SearchMoviesResponseDto } from './dtos/search-movies-response.dto';
import { errors } from './movies.error';
import { FindMovieRequestDto } from './dtos/find-movie-request.dto';
import { FindMovieResponseDto } from './dtos/find-movie-response.dto';

interface SearchFunctionHttpResponse {
  Search: HttpResponseMovie[];
  totalResults: string;
  Response: 'True' | 'False';
}

interface HttpResponseMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Actors: string;
  imdbRating: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
}

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async search({
    query,
    page = 1,
  }: SearchMoviesRequestDto): Promise<SearchMoviesResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<SearchFunctionHttpResponse>(process.env.API_PATH, {
        params: {
          apikey: process.env.API_KEY,
          type: 'movie',
          s: query,
          page,
        },
      }),
    );

    if (data.Response === 'False') {
      throw new NotFoundException(errors.MOVIES_NOT_FOUND);
    }

    return {
      movies: data.Search.map((movie) => ({
        title: movie.Title,
        imdbId: movie.imdbID,
        poster: movie.Poster === 'N/A' ? null : movie.Poster,
      })),
      totalResults: parseInt(data.totalResults),
    };
  }

  async findMovie({
    imdbID,
  }: FindMovieRequestDto): Promise<FindMovieResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<HttpResponseMovie>(process.env.API_PATH, {
        params: {
          apikey: process.env.API_KEY,
          i: imdbID,
        },
      }),
    );

    if (data === undefined) {
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
    };
  }
}
