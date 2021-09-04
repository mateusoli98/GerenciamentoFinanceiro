import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity("objective")
export default class Objective {
  @PrimaryGeneratedColumn("uuid")
  objectiveGuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalValue: number;

  @Column()
  entryValue: number;

  @Column()
  dateFinal: Date;

  @ManyToOne(() => User, (objectives) => Objective)
  user: User;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
