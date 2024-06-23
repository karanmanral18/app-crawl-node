import { Test, TestingModule } from '@nestjs/testing';
import { EventRegisterCallbackService } from './event-register-callback.service';

describe('EventRegisterCallbackService', () => {
  let service: EventRegisterCallbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventRegisterCallbackService],
    }).compile();

    service = module.get<EventRegisterCallbackService>(EventRegisterCallbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
