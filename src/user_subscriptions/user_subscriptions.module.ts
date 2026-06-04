import { Module } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { UserSubscriptionsController } from './user_subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { UserSubscription } from './entities/user_subscription.entity';
import { Token } from 'src/utils/Token';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscription, UserSubscription])],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService, Token],
})
export class UserSubscriptionsModule {}
