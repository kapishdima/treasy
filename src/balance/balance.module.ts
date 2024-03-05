import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { PrismaService } from 'src/db/db.module';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, PrismaService],
})
export class BalanceModule {}
