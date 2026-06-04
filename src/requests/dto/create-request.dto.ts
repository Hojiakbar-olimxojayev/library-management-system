import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsArray()
  @IsNotEmpty()
  books_ids: number[];
}
