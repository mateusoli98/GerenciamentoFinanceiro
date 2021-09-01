import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity("financialControl")
export default class FinancialControl {
  @PrimaryGeneratedColumn("uuid")
  financialControlGuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  income: boolean;

  @ManyToOne(() => User, (financialControls) => FinancialControl)
  user: User;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
