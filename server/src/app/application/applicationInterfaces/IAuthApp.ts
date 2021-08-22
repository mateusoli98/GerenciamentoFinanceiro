import { Request } from "express";
import { ResultResponse } from "../../models/ResultReponse";

export interface IAuthApp {
  authenticate(req: Request): Promise<ResultResponse>;
}
