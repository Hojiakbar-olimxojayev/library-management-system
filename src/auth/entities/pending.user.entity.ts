import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Pending_user')
export class PendingUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  full_name!: string;

  @Index('IDX_PENUSER_EMAIL')
  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar' })
  login!: string;

  @Column({ type: 'varchar' })
  otp!: string;

  @Column({ type: 'timestamp' })
  expires_at!: Date;

  @ManyToOne(() => Role, (role) => role.pUsers)
  role!: Role;
}
