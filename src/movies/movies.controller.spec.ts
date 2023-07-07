import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { errors } from './movies.error';
import { NotFoundException } from '@nestjs/common';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  describe('search', () => {
    it('should be able to search a list of movies', async () => {
      const response = await controller.search('Batman', 1);
      expect(response.movies.length).toBeGreaterThan(0);
      expect(response.totalResults).toBeGreaterThan(0);
    });

    it('should be able to search a list of movies in a specific page', async () => {
      const pageOneResponse = await controller.search('Batman', 1);
      const pageTwoResponse = await controller.search('Batman', 2);

      expect(pageOneResponse.movies.length).toBeGreaterThan(0);
      expect(pageTwoResponse.movies.length).toBeGreaterThan(0);

      expect(pageOneResponse.movies[0].title).not.toEqual(
        pageTwoResponse.movies[0].title,
      );
    });

    it('should not be able to search a list of movies in a page greater than the available', async () => {
      const pageOneResponse = await controller.search('spiderman', 1);

      const numberPageGreaterThanAvailable =
        pageOneResponse.totalResults / 10 + 1;

      await expect(
        controller.search('spiderman', numberPageGreaterThanAvailable),
      ).rejects.toEqual(new NotFoundException(errors.MOVIES_NOT_FOUND));
    });

    it('should not be able to search a list of movies with empty query', async () => {
      await expect(controller.search('', 1)).rejects.toEqual(
        new NotFoundException(errors.MOVIES_NOT_FOUND),
      );
    });
  });

  describe('find a movie', () => {
    it('should be able to find a movie by imdbId', async () => {
      const response = await controller.findMovie('tt0372784');
      expect(response.title).toEqual('Batman Begins');
    });
  });
});
