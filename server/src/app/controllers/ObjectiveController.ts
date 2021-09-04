import { Request, Response } from "express";
import ObjectiveApp from "../application/ObjectiveApp";
import { ResultResponseModel } from "../models/ResultReponse";
import ResultResponse from "./ResultResponse";

class ObjectiveController {
  async create(req: Request, res: Response) {
    let result: ResultResponseModel = await ObjectiveApp.create(req);

    return ResultResponse.result(result, res);
  }

  async getByUser(req: Request, res: Response) {
    let result: ResultResponseModel = await ObjectiveApp.getByUser(req);

    return ResultResponse.result(result, res);
  }

  async delete(req: Request, res: Response) {
    let result: ResultResponseModel = await ObjectiveApp.delete(req);

    return ResultResponse.result(result, res);
  }

  async update(req: Request, res: Response) {
    let result: ResultResponseModel = await ObjectiveApp.update(req);

    return ResultResponse.result(result, res);
  }
}

export default new ObjectiveController();
