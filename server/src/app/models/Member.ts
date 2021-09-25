import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Planning from "./Planning";
import User from "./User";

@Entity("member")
export default class Member {
  @PrimaryGeneratedColumn("uuid")
  memberGuid: string;

  @ManyToOne(() => User, (members) => Member)
  user: User;

  @ManyToOne(() => Planning, (members) => Member)
  planning: Planning

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
