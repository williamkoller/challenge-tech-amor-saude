import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  companyName: string;

  @Column({ type: 'varchar', nullable: false })
  fantasyName: string;

  @Column({ type: 'varchar', nullable: false })
  cnpj: string;

  @Column({ type: 'varchar', nullable: false })
  regional: string;

  @Column({ type: 'date', nullable: false })
  openingDate: Date;

  @Column({ type: 'boolean', nullable: false })
  active: Date;

  @Column({ type: 'int', nullable: true })
  userId?: number;

  @ManyToOne(() => User, (user) => user.companies, {
    nullable: true,
    cascade: true,
  })
  @JoinTable({
    name: 'userId',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  user?: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
