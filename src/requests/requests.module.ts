import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { Status } from 'src/statuses/status.entity';
import { Request } from './entities/request.entity';
import { Token } from 'src/utils/Token';
import { UserBook } from 'src/user-books/entities/user-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Status, Request, UserBook])],
  controllers: [RequestsController],
  providers: [RequestsService, Token],
})
export class RequestsModule {}
