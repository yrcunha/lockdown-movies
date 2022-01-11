import { Test, TestingModule } from '@nestjs/testing';
import { RentedService } from './rented.service';

describe('RentedService', () => {
  let service: RentedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentedService],
    }).compile();

    service = module.get<RentedService>(RentedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
