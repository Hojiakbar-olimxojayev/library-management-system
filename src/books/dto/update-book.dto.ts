import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @Type(() => Number)
  @IsNumber()
  @Optional()
  quantity?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  author_id?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  genre_id?: number;
}
