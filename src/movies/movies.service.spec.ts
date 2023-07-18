import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { errors } from './movies.error';
import { NotFoundException } from '@nestjs/common';
import { IMoviesRepository } from './repositories/interfaces/IMoviesRepository';
import { MoviesRepository } from './repositories/in-memory/MoviesRepository';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [
        MoviesService,
        {
          provide: IMoviesRepository,
          useClass: MoviesRepository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('search', () => {
    it('should be able to search a list of movies', async () => {
      const response = await service.search({ query: 'Batman', page: 1 });
      expect(response.movies.length).toBeGreaterThan(0);
      expect(response.totalResults).toBeGreaterThan(0);
    });

    it('should be able to search a list of movies in a specific page', async () => {
      const pageOneResponse = await service.search({
        query: 'Batman',
        page: 1,
      });

      const pageTwoResponse = await service.search({
        query: 'Batman',
        page: 2,
      });

      expect(pageOneResponse.movies.length).toBeGreaterThan(0);
      expect(pageTwoResponse.movies.length).toBeGreaterThan(0);

      expect(pageOneResponse.movies[0].title).not.toEqual(
        pageTwoResponse.movies[0].title,
      );
    });

    it('should not be able to search a list of movies in a page greater than the available', async () => {
      const pageOneResponse = await service.search({
        query: 'Batman',
        page: 1,
      });

      const numberPageGreaterThanAvailable =
        pageOneResponse.totalResults / 10 + 1;

      const response = await service.search({
        query: 'Batman',
        page: numberPageGreaterThanAvailable,
      });

      expect(response.movies.length).toEqual(0);
      expect(response.totalResults).toEqual(0);
    });

    it('should not be able to search a list of movies with empty query', async () => {
      const response = await service.search({ query: '', page: 1 });
      expect(response.movies.length).toEqual(0);
      expect(response.totalResults).toEqual(0);
    });
  });

  describe('find a movie', () => {
    it('should be able to find a movie by imdbId', async () => {
      const response = await service.findMovie({ imdbID: 'tt0372784' });
      expect(response.title).toEqual('Batman Begins');
    });

    it('should not be able to find a movie with empty imdbID', async () => {
      await expect(
        service.findMovie({
          imdbID: '',
        }),
      ).rejects.toEqual(new NotFoundException(errors.MOVIES_NOT_FOUND));
    });

    it('should not be able to find a movie with a non-existent imdbID', async () => {
      await expect(
        service.findMovie({
          imdbID: 'wrongImdbID',
        }),
      ).rejects.toEqual(new NotFoundException(errors.MOVIES_NOT_FOUND));
    });
  });
});
