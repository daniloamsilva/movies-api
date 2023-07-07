import { movies } from '../../../../test/movies';
import {
  HttpResponseMovie,
  IMoviesRepository,
  SearchFunctionHttpResponse,
} from '../interfaces/IMoviesRepository';

export class MoviesRepository implements IMoviesRepository {
  private repository = movies;

  search(query: string, page: number): Promise<SearchFunctionHttpResponse> {
    const data = this.repository
      .filter((movie) => movie.Title.includes(query))
      .slice(10 * (page - 1), 10 * page);

    if (query.length === 0 || data.length === 0) {
      return Promise.resolve({
        Response: 'False',
        Search: [],
        totalResults: '0',
      });
    }

    return Promise.resolve({
      Response: 'True',
      Search: data,
      totalResults: this.repository.length.toString(),
    });
  }
  findMovie(imdbID: string): Promise<HttpResponseMovie> {
    const data = this.repository.find((movie) => movie.imdbID === imdbID);

    if (!data) {
      return Promise.resolve({ ...data, Response: 'False' });
    }

    return Promise.resolve(data);
  }
}
