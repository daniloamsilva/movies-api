import { Movie } from '../entities/movie.entity';

export interface SearchMoviesResponseDto {
  movies: Movie[];
  totalResults: number;
}
