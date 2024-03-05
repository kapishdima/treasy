import { PartialType } from '@nestjs/swagger';
import { CreateGoalOperationDto } from './create-goal_operation.dto';

export class UpdateGoalOperationDto extends PartialType(CreateGoalOperationDto) {}
