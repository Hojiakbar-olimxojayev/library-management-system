import { Module } from '@nestjs/common';
import { UserBooksService } from './user-books.service';
import { UserBooksController } from './user-books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { Request } from 'src/requests/entities/request.entity';
import { UserBook } from './entities/user-book.entity';
import { Token } from 'src/utils/Token';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Request, UserBook])],
  controllers: [UserBooksController],
  providers: [UserBooksService, Token],
})
export class UserBooksModule {}
