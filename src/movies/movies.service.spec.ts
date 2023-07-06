import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('MoviesService', () => {
    it('should be able to search a list of movies', async () => {
      const response = await service.search({ query: 'Batman', page: 1 });
      expect(response.movies.length).toBeGreaterThan(0);
      expect(response.totalResults).toBeGreaterThan(0);
    });
  });
});
