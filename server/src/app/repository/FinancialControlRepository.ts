import { Request } from "express";
import { Between, getRepository } from "typeorm";
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

  async getByUser(user: User, initialDate: string, finalDate: string): Promise<Array<FinancialControl> | null> {
    const repository = getRepository(FinancialControl);

    const financialControls: Array<FinancialControl> = await repository.find({
      where: {
        user,
        created_at: Between(initialDate, finalDate),
      },
      order: { created_at: "DESC" },
    });

    return financialControls;
  }

  async getAll(user: User, initialDate: string, finalDate: string): Promise<Array<FinancialControl> | null> {
    const repository = getRepository(FinancialControl);

    const financialControls: Array<FinancialControl> = await repository.find({
      where: {
        user,
        created_at: Between(initialDate, finalDate),
      },
    });

    return financialControls;
  }

  async getCurrentMonth(user: User, initialDate: string, finalDate: string): Promise<Array<FinancialControl> | null> {
    const repository = getRepository(FinancialControl);

    const financialControls: Array<FinancialControl> = await repository.find({
      where: {
        user,
        created_at: Between(initialDate, finalDate),
      },
      order: {
        created_at: "ASC",
      },
    });

    return financialControls;
  }

  async find(financialControlGuid: string): Promise<FinancialControl | null> {
    const repository = getRepository(FinancialControl);

    const result: FinancialControl = await repository.findOne({
      where: { financialControlGuid },
    });

    return result;
  }

  async deleteFinancialControl(financialControl: FinancialControl): Promise<boolean> {
    const repository = getRepository(FinancialControl);

    const result: FinancialControl = await repository.remove(financialControl);

    if (result) {
      return true;
    }

    return false;
  }

  async updateFinancialControl(financialControlBefore: FinancialControl, financialControlAfter: FinancialControl): Promise<FinancialControl | null> {
    const repository = getRepository(FinancialControl);

    const financialControlUpdated: FinancialControl = await repository.merge(financialControlBefore, financialControlAfter);

    const result: FinancialControl = await repository.save(financialControlUpdated);

    if (result) {
      return result;
    }

    return null;
  }
}

export default new FinancialControlRepository();
