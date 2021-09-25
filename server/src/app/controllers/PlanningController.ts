import { Request, Response } from "express";
import PlanningApp from "../application/PlanningApp";
import { ResultResponseModel } from "../models/ResultReponse";
import ResultResponse from "./ResultResponse";

class PlanningController {
  async create(req: Request, res: Response) {
    let result: ResultResponseModel = await PlanningApp.create(req);

    return ResultResponse.result(result, res);
  }

  async getByUser(req: Request, res: Response) {
    let result: ResultResponseModel = await PlanningApp.getByUser(req);


    return ResultResponse.result(result, res);
  }

  async delete(req: Request, res: Response) {
    let result: ResultResponseModel = await PlanningApp.delete(req);

    return ResultResponse.result(result, res);
  }

  async update(req: Request, res: Response) {
    let result: ResultResponseModel = await PlanningApp.update(req);

    return ResultResponse.result(result, res);
  }
}

export default new PlanningController();
