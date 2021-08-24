import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity("financialControl")
export default class FinancialControl {
  @PrimaryGeneratedColumn("uuid")
  id: number;

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
}
