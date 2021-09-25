import { Request } from "express";
import Planning from "../../models/Planning";
import User from "../../models/User";

export interface IPlanningRepository {
  create(req: Request, user: User): Promise<Planning | null>;
  getByUser(user: User, isGrouped: boolean): Promise<Array<Planning> | null>;
  find(planningGuid: string): Promise<Planning | null>;
  delete(planning: Planning): Promise<boolean>;
  update(planningBefore: Planning, planningAfter: Planning): Promise<Planning | null>;
}
