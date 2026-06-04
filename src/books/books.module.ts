import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Token } from 'src/utils/Token';
import { Request } from 'src/requests/entities/request.entity';
import { UserBook } from 'src/user-books/entities/user-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Author, Request, UserBook])],
  controllers: [BooksController],
  providers: [BooksService, Token],
})
export class BooksModule {}
