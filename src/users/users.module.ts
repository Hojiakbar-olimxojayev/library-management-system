import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from './entities/user.entity';
import { Token } from 'src/utils/Token';
import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';
import { Request } from 'src/requests/entities/request.entity';
import { UserBook } from 'src/user-books/entities/user-book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, UserSubscription, Request, UserBook]),
  ],
  controllers: [UsersController],
  providers: [UsersService, Token],
})
export class UsersModule {}
