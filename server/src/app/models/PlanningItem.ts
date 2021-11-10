import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Planning from "./Planning";

@Entity("planningItem")
export default class PlanningItem {
  @PrimaryGeneratedColumn("uuid")
  planningItemGuid: string;

  @Column()
  name: string;

  @Column()
  totalValue: number;

  @Column()
  entryValue: number;
  
  @Column()
  category: number;

  @ManyToOne(() => Planning, (planningItems) => PlanningItem, { onDelete: 'CASCADE' })
  planning: Planning;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
