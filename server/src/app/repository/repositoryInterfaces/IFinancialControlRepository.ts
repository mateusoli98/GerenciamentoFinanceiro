import { Request } from "express";
import FinancialControl from "../../models/FinancialControl";
import User from "../../models/User";

export interface IFinancialControlRepository {
  create(req: Request, user: User): Promise<FinancialControl | null>;
  getByUser(user: User, initialDate: string, finalDate: string): Promise<Array<FinancialControl> | null>;
  getAll(user: User, initialDate: string, finalDate: string): Promise<Array<FinancialControl> | null>;
  getCurrentMonth(user: User, initialDate: string, finalDate: string): Promise<Array<FinancialControl> | null>;
  find(financialControlGuid: string): Promise<FinancialControl | null>;
  deleteFinancialControl(financialControl: FinancialControl): Promise<boolean>;
  updateFinancialControl(financialControlBefore: FinancialControl, financialControlAfter: FinancialControl): Promise<FinancialControl | null>;
}
