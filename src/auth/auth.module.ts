import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { PendingUser } from './entities/pending.user.entity';
import { Token } from 'src/utils/Token';
import { Cache } from 'src/utils/cache.control';
import { ProcessingUser } from './entities/processing.user.entity';
import { TasksSerive } from './tasks.service';
import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      PendingUser,
      ProcessingUser,
      UserSubscription,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, Token, Cache, TasksSerive],
})
export class AuthModule {}
