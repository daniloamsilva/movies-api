export interface SearchFunctionHttpResponse {
  Search: HttpResponseMovie[];
  totalResults: string;
  Response: 'True' | 'False';
}

export interface HttpResponseMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Actors: string;
  imdbRating: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
  Response: 'True' | 'False';
}

export abstract class IMoviesRepository {
  abstract search(
    query: string,
    page: number,
  ): Promise<SearchFunctionHttpResponse>;
  abstract findMovie(imdbID: string): Promise<HttpResponseMovie>;
}
