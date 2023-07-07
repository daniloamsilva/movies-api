import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SearchMoviesRequestDto } from './dtos/search-movies-request.dto';
import { firstValueFrom } from 'rxjs';
import { SearchMoviesResponseDto } from './dtos/search-movies-response.dto';
import { errors } from './movies.error';

interface SearchFunctionHttpResponse {
  Search: HttpResponseMovie[];
  totalResults: string;
  Response: 'True' | 'False';
}

interface HttpResponseMovie {
  Title: string;
  imdbID: string;
  Poster: string;
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
}
