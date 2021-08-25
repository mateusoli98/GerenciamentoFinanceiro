import { Request, Response } from "express";
import FinancialControlApp from "../application/FinancialControlApp";
import { ResultResponseModel } from "../models/ResultReponse";
import ResultResponse from "./ResultResponse";

class FinancialControlController {
  async create(req: Request, res: Response) {
    let result: ResultResponseModel = await FinancialControlApp.create(req);

    return ResultResponse.result(result, res);
  }

  async getByUser(req: Request, res: Response){
    let result: ResultResponseModel = await FinancialControlApp.getByUser(req);

    return ResultResponse.result(result, res);
  }
}

export default new FinancialControlController();
