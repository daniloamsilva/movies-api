import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

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

  describe('MoviesController', () => {
    it('should be able to search a list of movies', async () => {
      const response = await controller.search('Batman', 1);
      expect(response.movies.length).toBeGreaterThan(0);
      expect(response.totalResults).toBeGreaterThan(0);
    });
  });
});
