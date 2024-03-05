import { Test, TestingModule } from '@nestjs/testing';
import { GoalOperationService } from './goal_operation.service';

describe('GoalOperationService', () => {
  let service: GoalOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalOperationService],
    }).compile();

    service = module.get<GoalOperationService>(GoalOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
