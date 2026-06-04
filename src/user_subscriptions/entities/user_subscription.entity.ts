import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User_subscriptions')
export class UserSubscription {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  issued_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  end_date: Date;

  @Column({ type: 'boolean', nullable: false })
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.users)
  subscription: Subscription;
}
