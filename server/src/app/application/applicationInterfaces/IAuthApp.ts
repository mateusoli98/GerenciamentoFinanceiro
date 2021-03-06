import { Request } from "express";
import { ResultResponseModel } from "../../models/ResultReponse";

export interface IAuthApp {
  authenticate(req: Request): Promise<ResultResponseModel>;
}
