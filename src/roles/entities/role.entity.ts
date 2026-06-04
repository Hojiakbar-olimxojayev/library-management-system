import { PendingUser } from 'src/auth/entities/pending.user.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @OneToMany(() => User, (users) => users.role)
  users: User[];

  @OneToMany(() => PendingUser, (pusers) => pusers.role)
  pUsers: PendingUser[];
}
