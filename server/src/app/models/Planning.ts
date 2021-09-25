import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Member from "./Member";
import PlanningItem from "./PlanningItem";
import User from "./User";

@Entity("planning")
export default class Planning {
  @PrimaryGeneratedColumn("uuid")
  planningGuid: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  dateFinal: Date;

  @Column()
  isGrouped: boolean;

  @OneToMany(() => PlanningItem, (planning) => Planning, { onDelete: "CASCADE" })
  planningItems: Array<PlanningItem>;

  @OneToMany(() => Member, (planning) => Planning)
  members: Array<Member>;

  @ManyToOne(() => User, (plannings) => Planning)
  user: User;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
