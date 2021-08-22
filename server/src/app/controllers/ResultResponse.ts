import { Response } from "express";
import { ResultResponseModel } from "../models/ResultReponse";

class ResultResponse {
  result(result: ResultResponseModel, res: Response) {
    if (!result.success) {
      const status = result.statusCode;

      delete result.statusCode;
      delete result.success;

      return res.status(status).json(result);
    }

    return res.json(result.result);
  }
}

export default new ResultResponse();
