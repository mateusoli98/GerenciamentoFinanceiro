import { Request, Response } from "express";
import UserApp from "../application/UserApp";
import { ResultResponseModel } from "../models/ResultReponse";
import ResultResponse from "./ResultResponse";

class UserController {
  async signUp(req: Request, res: Response) {
    let result: ResultResponseModel = await UserApp.create(req);

    return ResultResponse.result(result, res);
  }
}

export default new UserController();
