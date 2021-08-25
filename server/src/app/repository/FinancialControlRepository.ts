import { Request } from "express";
import { DeleteResult, getRepository } from "typeorm";
import FinancialControl from "../models/FinancialControl";
import User from "../models/User";
import { IFinancialControlRepository } from "./repositoryInterfaces/IFinancialControlRepository";

class FinancialControlRepository implements IFinancialControlRepository {
  async create(req: Request, user: User): Promise<FinancialControl | null> {
    const repository = getRepository(FinancialControl);

    const { name, description, income, value } = req.body;

    const financialControl = repository.create({
      name,
      description,
      income,
      value,
      user,
    });
    await repository.save(financialControl);

    return financialControl;
  }

  async getByUser(user: User): Promise<Array<FinancialControl> | null> {
    const repository = getRepository(FinancialControl);

    const financialControls: Array<FinancialControl> = await repository.find({
      where: { user },
    });

    return financialControls;
  }

  async find(req: Request): Promise<FinancialControl | null> {
    const repository = getRepository(FinancialControl);

    const { id } = req.query;

    const result: FinancialControl = await repository.findOne({
      where: { id },
    });

    return result;
  }

  async deleteFinancialControl(
    financialControl: FinancialControl
  ): Promise<boolean> {
    const repository = getRepository(FinancialControl);

    const result: DeleteResult = await repository.delete(financialControl);

    if (result.raw) {
      return true;
    }

    return false;
  }
}

export default new FinancialControlRepository();
