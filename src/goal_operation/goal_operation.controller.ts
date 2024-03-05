import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoalOperationService } from './goal_operation.service';
import { CreateGoalOperationDto } from './dto/create-goal_operation.dto';
import { UpdateGoalOperationDto } from './dto/update-goal_operation.dto';

@Controller('goal-operation')
export class GoalOperationController {
  constructor(private readonly goalOperationService: GoalOperationService) {}

  @Post()
  create(@Body() createGoalOperationDto: CreateGoalOperationDto) {
    return this.goalOperationService.create(createGoalOperationDto);
  }

  @Get()
  findAll() {
    return this.goalOperationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalOperationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalOperationDto: UpdateGoalOperationDto) {
    return this.goalOperationService.update(+id, updateGoalOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalOperationService.remove(+id);
  }
}
