import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Subscription')
export class Subscription {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index('IDX_SUBSCRIPTION_NAME')
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  price: number;

  @Column({ type: 'smallint', nullable: false })
  period: number;

  @OneToMany(() => UserSubscription, (usubs) => usubs.subscription)
  users: UserSubscription[];
}
