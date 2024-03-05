import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { OperationModule } from './operation/operation.module';
import { BalanceModule } from './balance/balance.module';
import { CategoryModule } from './category/category.module';
import { GoalModule } from './goal/goal.module';
import { GoalOperationModule } from './goal_operation/goal_operation.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OperationModule,
    BalanceModule,
    CategoryModule,
    GoalModule,
    GoalOperationModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
