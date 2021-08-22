import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";
import AuthRepository from "../repository/AuthRepository";
import { IAuthApp } from "./applicationInterfaces/IAuthApp";
import { ResultResponseModel } from "../models/ResultReponse";

class AuthApp implements IAuthApp {
  async authenticate(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const { password } = req.body;

    const user = await AuthRepository.authenticate(req);

    if (!user) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.Unauthorized;
      response.errors.push({
        message: "Usuário não encontrado",
      });

      return response;
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.Unauthorized;
      response.errors.push({
        message: "Erro ao efetuar login, tente novamente",
      });

      return response;
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_OR_PRIVATE_KEY, {
      expiresIn: "1d",
    });

    delete user.password;
    delete user.id;

    response.success = true;
    response.result = {
      user,
      token,
    };

    return response;
  }
}

export default new AuthApp();
