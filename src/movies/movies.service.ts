import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SearchMoviesRequestDto } from './dtos/search-movies-request.dto';
import { firstValueFrom } from 'rxjs';
import { SearchMoviesResponseDto } from './dtos/search-movies-response.dto';

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
    page,
  }: SearchMoviesRequestDto): Promise<SearchMoviesResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<SearchFunctionHttpResponse>(process.env.API_PATH, {
        params: {
          apikey: process.env.API_KEY,
          s: query,
          page,
        },
      }),
    );

    return {
      movies: data.Search.map((movie) => ({
        title: movie.Title,
        imdbId: movie.imdbID,
        poster: movie.Poster,
      })),
      totalResults: parseInt(data.totalResults),
    };
  }
}
