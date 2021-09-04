import { Request } from "express";
import Objective from "../../models/Objectives";
import User from "../../models/User";

export interface IObjectiveRepository {
  create(req: Request, user: User): Promise<Objective | null>;
  getByUser(user: User): Promise<Array<Objective> | null>;
  find(objectiveGuid: string): Promise<Objective | null>;
  delete(objective: Objective): Promise<boolean>;
  update(objectiveBefore: Objective, objectiveAfter: Objective): Promise<Objective | null>;
}
