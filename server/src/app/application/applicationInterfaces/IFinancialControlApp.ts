import { Request } from "express";
import { ResultResponseModel } from "../../models/ResultReponse";

export interface IFinancialControlApp {
  create(req: Request): Promise<ResultResponseModel>;
  getByUser(req: Request): Promise<ResultResponseModel>;
  getChartCurrentMonth(req: Request): Promise<ResultResponseModel>;
  getBalance(req: Request): Promise<ResultResponseModel>;
  deleteFinancialControl(req: Request): Promise<ResultResponseModel>;
  updateFinancialControl(req: Request): Promise<ResultResponseModel>;
}
