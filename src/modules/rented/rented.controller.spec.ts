import { Test, TestingModule } from '@nestjs/testing';
import { RentedController } from './rented.controller';

describe('RentedController', () => {
  let controller: RentedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentedController],
    }).compile();

    controller = module.get<RentedController>(RentedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
