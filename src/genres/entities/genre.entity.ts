import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Genre')
export class Genre {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index('IDX_GENRE_NAME')
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];
}
