import { Request, Response } from "express";
import { ResultResponse } from "../models/ResultReponse";
import AuthApp from "../application/AuthApp";

class AuthController {
  async authenticate(req: Request, res: Response) {
    let response: ResultResponse = await AuthApp.authenticate(req);

    if (!response.success) {
      const status = response.statusCode;

      delete response.statusCode;
      delete response.success;

      return res.status(status).json(response);
    }

    return res.json(response.result);
  }
}

export default new AuthController();
