import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import FinancialControl from "./FinancialControl";
import Objective from "./Objectives";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => FinancialControl, (user) => User)
  financialControls: Array<FinancialControl>;

  @OneToMany(() => Objective, (user) => User)
  objectives: Array<Objective>;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
