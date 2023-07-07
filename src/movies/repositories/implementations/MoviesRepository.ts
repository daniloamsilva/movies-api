import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  HttpResponseMovie,
  IMoviesRepository,
  SearchFunctionHttpResponse,
} from '../interfaces/IMoviesRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesRepository implements IMoviesRepository {
  constructor(private readonly httpService: HttpService) {}

  async search(
    query: string,
    page: number,
  ): Promise<SearchFunctionHttpResponse> {
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

    return data;
  }

  async findMovie(imdbID: string): Promise<HttpResponseMovie> {
    const { data } = await firstValueFrom(
      this.httpService.get<HttpResponseMovie>(process.env.API_PATH, {
        params: {
          apikey: process.env.API_KEY,
          i: imdbID,
        },
      }),
    );

    return data;
  }
}
