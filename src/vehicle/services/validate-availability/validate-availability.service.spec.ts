import { Test, TestingModule } from '@nestjs/testing';
import { ValidateAvailabilityService } from './validate-availability.service';

describe('ValidateAvailabilityService', () => {
  let service: ValidateAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateAvailabilityService],
    }).compile();

    service = module.get<ValidateAvailabilityService>(ValidateAvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
