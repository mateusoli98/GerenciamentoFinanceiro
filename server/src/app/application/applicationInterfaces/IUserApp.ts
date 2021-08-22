import { Request } from "express";
import { ResultResponseModel } from "../../models/ResultReponse";

export interface IUserApp {
  create(req: Request): Promise<ResultResponseModel>;
}
