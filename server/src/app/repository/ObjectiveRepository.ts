import { Request } from "express";
import Objective from "../models/Objectives";
import User from "../models/User";
import { Between, getRepository } from "typeorm";

import { IObjectiveRepository } from "./repositoryInterfaces/IObjectiveRepository";

class ObjectiveRepository implements IObjectiveRepository {
  async create(req: Request, user: User): Promise<Objective | null> {
    const repository = getRepository(Objective);

    const { name, description, entryValue, totalValue, dateFinal } = req.body;

    const objective = repository.create({
      name,
      description,
      entryValue,
      totalValue,
      dateFinal: new Date(dateFinal),
      user,
    });

    await repository.save(objective);

    return objective;
  }

  async getByUser(user: User): Promise<Array<Objective> | null> {
    const repository = getRepository(Objective);
    const currentDate = new Date();

    const objectives: Array<Objective> = await repository.find({
      where: {
        user,
        dateFinal: Between(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), new Date(2100, 0, 1)),
      },
      order: { name: "ASC" },
    });

    return objectives;
  }

  async find(objectiveGuid: string): Promise<Objective | null> {
    const repository = getRepository(Objective);

    const objective: Objective = await repository.findOne({ where: { objectiveGuid } });

    return objective;
  }

  async delete(objective: Objective): Promise<boolean> {
    const repository = getRepository(Objective);

    const result: Objective = await repository.remove(objective);

    if (result) {
      return true;
    }

    return false;
  }

  async update(objectiveBefore: Objective, objectiveAfter: Objective): Promise<Objective | null> {
    const repository = getRepository(Objective);

    const objectiveUpdated: Objective = await repository.merge(objectiveBefore, objectiveAfter);

    const result: Objective = await repository.save(objectiveUpdated);

    if (result) {
      return result;
    }

    return null;
  }
}

export default new ObjectiveRepository();
function addYears(
  arg0: Date,
  addYears: any
): any | import("typeorm").FindConditions<Date> | import("typeorm").FindOperator<import("typeorm").FindConditions<Date>> {
  throw new Error("Function not implemented.");
}
