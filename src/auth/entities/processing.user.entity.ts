import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Processing_user')
export class ProcessingUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index(`IDX_PROUSER_EMAIL`)
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  otp: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;
}
