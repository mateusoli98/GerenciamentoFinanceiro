import { Request } from "express";
import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";
import { ResultResponseModel } from "../models/ResultReponse";
import UserRepository from "../repository/UserRepository";
import { IUserApp } from "./applicationInterfaces/IUserApp";

class UserApp implements IUserApp {
  async create(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const userExists = await UserRepository.find(req);

    if (userExists) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.Conflict;
      response.errors.push({
        message: "Erro - Usuário já existe. Tente novamente",
      });

      return response;
    }

    const user = await UserRepository.create(req);

    if (!user) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno - Não foi possível realizar o cadastro.",
      });

      return response;
    }

    delete user.password;
    delete user.id;

    response.success = true;
    response.result = user;

    return response;
  }
}

export default new UserApp();
