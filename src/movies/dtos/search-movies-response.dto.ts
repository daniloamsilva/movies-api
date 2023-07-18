import { Movie } from '../entities/movie.entity';

export interface SearchMoviesResponseDto {
  search: string;
  page: number;
  movies: MovieResponseDto[];
  totalResults: number;
}

type MovieResponseDto = Pick<Movie, 'imdbId' | 'title' | 'poster'>;
