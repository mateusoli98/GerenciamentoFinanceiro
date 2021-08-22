import { Request, Response } from "express";
import { ResultResponseModel } from "../models/ResultReponse";
import AuthApp from "../application/AuthApp";
import ResultResponse from "./ResultResponse";

class AuthController {
  async authenticate(req: Request, res: Response) {
    let result: ResultResponseModel = await AuthApp.authenticate(req);

   return ResultResponse.result(result, res);
  }
}

export default new AuthController();
