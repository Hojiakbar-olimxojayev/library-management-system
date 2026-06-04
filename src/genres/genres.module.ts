import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Book } from 'src/books/entities/book.entity';
import { Token } from 'src/utils/Token';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Book])],
  controllers: [GenresController],
  providers: [GenresService, Token],
})
export class GenresModule {}
