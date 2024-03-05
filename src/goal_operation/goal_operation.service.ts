import { Injectable } from '@nestjs/common';
import { CreateGoalOperationDto } from './dto/create-goal_operation.dto';
import { UpdateGoalOperationDto } from './dto/update-goal_operation.dto';

@Injectable()
export class GoalOperationService {
  create(createGoalOperationDto: CreateGoalOperationDto) {
    return 'This action adds a new goalOperation';
  }

  findAll() {
    return `This action returns all goalOperation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goalOperation`;
  }

  update(id: number, updateGoalOperationDto: UpdateGoalOperationDto) {
    return `This action updates a #${id} goalOperation`;
  }

  remove(id: number) {
    return `This action removes a #${id} goalOperation`;
  }
}
