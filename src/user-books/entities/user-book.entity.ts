// user-books/entities/user-book.entity.ts
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'src/requests/entities/request.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.userBooks)
  user: User;

  @ManyToOne(() => Book, (book) => book.userBooks)
  book: Book;

  @OneToOne(() => Request, (req) => req.userBook)
  @JoinColumn()
  request: Request;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  borrowed_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  returned_at: Date;

  @Column({ default: true })
  is_active: boolean;
}
