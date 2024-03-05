import { Module } from '@nestjs/common';
import { GoalOperationService } from './goal_operation.service';
import { GoalOperationController } from './goal_operation.controller';

@Module({
  controllers: [GoalOperationController],
  providers: [GoalOperationService],
})
export class GoalOperationModule {}
