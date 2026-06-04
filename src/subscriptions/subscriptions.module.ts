import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Token } from 'src/utils/Token';
import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, UserSubscription])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, Token],
})
export class SubscriptionsModule {}
