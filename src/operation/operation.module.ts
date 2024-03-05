import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { PrismaService } from 'src/db/db.module';

@Module({
  controllers: [OperationController],
  providers: [OperationService, PrismaService],
})
export class OperationModule {}
