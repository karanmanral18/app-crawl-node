import { Test, TestingModule } from '@nestjs/testing';
import { PaginateOverwriteService } from './paginate-overwrite.service';

describe('PaginateOverwriteService', () => {
  let service: PaginateOverwriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginateOverwriteService],
    }).compile();

    service = module.get<PaginateOverwriteService>(PaginateOverwriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
