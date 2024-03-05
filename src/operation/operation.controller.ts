import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { ApiBody } from '@nestjs/swagger';
import { ApiResource } from 'src/shared/http';

@Controller('operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @ApiBody({ type: CreateOperationDto })
  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Get()
  async findAll() {
    const operations = await this.operationService.findAll();

    return new ApiResource(operations).toJson();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const operation = await this.operationService.findOne(+id);

    return new ApiResource(operation).toJson();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(+id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(+id);
  }
}
