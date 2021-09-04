import { Request } from "express";
import { ResultResponseModel } from "../../models/ResultReponse";

export interface IObjectiveApp {
  create(req: Request): Promise<ResultResponseModel>;
  getByUser(req: Request): Promise<ResultResponseModel>;
  delete(req: Request): Promise<ResultResponseModel>;
  update(req: Request): Promise<ResultResponseModel>;
}
