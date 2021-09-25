import { Request } from "express";
import { getRepository } from "typeorm";
import Planning from "../models/Planning";
import User from "../models/User";
import { IPlanningRepository } from "./repositoryInterfaces/IPlanningRepository";

class PlanningRepository implements IPlanningRepository {
  async create(req: Request, user: User): Promise<Planning | null> {
    const repository = getRepository(Planning);

    const { name, value, dateFinal, isGrouped } = req.body;

    const planning = repository.create({
      name,
      value,
      isGrouped,
      dateFinal: new Date(dateFinal),
      user,
    });

    await repository.save(planning);

    return planning;
  }

  async getByUser(user: User, isGrouped: boolean): Promise<Array<Planning> | null> {
    const repository = getRepository(Planning);

    const plannings: Array<Planning> = await repository.find({ where: { user, isGrouped }, order: { created_at: "ASC" } });

    return plannings;
  }

  async find(planningGuid: string): Promise<Planning | null> {
    const repository = getRepository(Planning);

    const planning: Planning = await repository.findOne({ where: { planningGuid } });

    return planning;
  }

  async delete(planning: Planning): Promise<boolean> {
    const repository = getRepository(Planning);

    const result: Planning = await repository.remove(planning);

    if (result) {
      return true;
    }

    return false;
  }

  async update(planningBefore: Planning, planningAfter: Planning): Promise<Planning | null> {
    const repository = getRepository(Planning);

    const planningUpdated: Planning = await repository.merge(planningBefore, planningAfter);

    const result: Planning = await repository.save(planningUpdated);

    if (result) {
      return result;
    }

    return null;
  }
}

export default new PlanningRepository();
