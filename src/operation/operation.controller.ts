import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { SortAttrs } from 'src/shared/http';
import {
  OperationFilters,
  OperationFiltersParams,
} from './filters/operation-filters';
import { Filters, Sort } from 'src/shared/decorators';
import { OperationResource } from './resource/operation-resource';

@Controller('operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @ApiBody({ type: CreateOperationDto })
  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Get()
  async findAll(
    @Filters(OperationFilters) filters: OperationFiltersParams,
    @Sort() sort: SortAttrs,
  ) {
    const operations = await this.operationService.findAll({ filters, sort });

    return OperationResource.toArray(operations);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const operation = await this.operationService.findOne(+id);

    return OperationResource.toObject(operation);
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
