import { Request } from 'src/requests/entities/request.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserBook } from 'src/user-books/entities/user-book.entity';
import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  full_name: string;

  @Index('IDX_USER_EMAIL')
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  login: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => UserSubscription, (usubs) => usubs.user)
  subscriptions: UserSubscription[];

  @OneToMany(() => Request, (rquest) => rquest.user)
  requests: Request[];

  @OneToMany(() => UserBook, (ubook) => ubook.user)
  userBooks: UserBook[];
}
