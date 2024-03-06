import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { PrismaService } from 'src/db/db.module';
import { BalanceModule } from 'src/balance/balance.module';

@Module({
  imports: [BalanceModule],
  controllers: [OperationController],
  providers: [OperationService, PrismaService],
})
export class OperationModule {}
