import { Request } from "express";
import { ResultResponseModel } from "../../models/ResultReponse";

export interface IFinancialControlApp {
  create(req: Request): Promise<ResultResponseModel>;
}
