import { Test, TestingModule } from '@nestjs/testing';
import { GoalOperationController } from './goal_operation.controller';
import { GoalOperationService } from './goal_operation.service';

describe('GoalOperationController', () => {
  let controller: GoalOperationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalOperationController],
      providers: [GoalOperationService],
    }).compile();

    controller = module.get<GoalOperationController>(GoalOperationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
