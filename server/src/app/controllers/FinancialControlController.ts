import { Request, Response } from "express";
import FinancialControlApp from "../application/FinancialControlApp";
import { ResultResponseModel } from "../models/ResultReponse";
import ResultResponse from "./ResultResponse";

class FinancialControlController {
  async create(req: Request, res: Response) {
    let result: ResultResponseModel = await FinancialControlApp.create(req);

    return ResultResponse.result(result, res);
  }

  async getByUser(req: Request, res: Response) {
    let result: ResultResponseModel = await FinancialControlApp.getByUser(req);

    return ResultResponse.result(result, res);
  }

  async getChartCurrentMonth(req: Request, res: Response) {
    let result: ResultResponseModel = await FinancialControlApp.getChartCurrentMonth(req);

    return ResultResponse.result(result, res);
  }

  async getBalance(req: Request, res: Response) {
    let result: ResultResponseModel = await FinancialControlApp.getBalance(req);

    return ResultResponse.result(result, res);
  }

  async deleteFinancialControl(req: Request, res: Response) {
    let result: ResultResponseModel = await FinancialControlApp.deleteFinancialControl(req);

    return ResultResponse.result(result, res);
  }

  async updateFinancialControl(req: Request, res: Response) {
    let result: ResultResponseModel = await FinancialControlApp.updateFinancialControl(req);

    return ResultResponse.result(result, res);
  }
}

export default new FinancialControlController();
