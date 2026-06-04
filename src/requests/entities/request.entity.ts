import { Book } from 'src/books/entities/book.entity';
import { Purpose } from 'src/config/purpose-enum';
import { Status } from 'src/statuses/status.entity';
import { UserBook } from 'src/user-books/entities/user-book.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: Purpose, default: Purpose.borrow })
  purpose: Purpose;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Book, (book) => book.requests)
  book: Book;

  @ManyToOne(() => Status, (st) => st.requests)
  status: Status;

  @OneToOne(() => UserBook, (ubook) => ubook.request)
  userBook: UserBook;
}
