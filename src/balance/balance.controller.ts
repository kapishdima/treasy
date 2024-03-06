import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/shared/decorators';
import { BalanceResource } from './resource/balance-resource';

import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';

@UseGuards(AuthGuard)
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post()
  create(@Body() createBalanceDto: CreateBalanceDto, @User() userId: string) {
    return this.balanceService.create({ ...createBalanceDto, userId });
  }

  @Get()
  async findAll() {
    const balances = await this.balanceService.findAll();

    return BalanceResource.toArray(balances);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const balance = await this.balanceService.findOne(id);

    return BalanceResource.toObject(balance);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balanceService.update(id, updateBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balanceService.remove(id);
  }
}
