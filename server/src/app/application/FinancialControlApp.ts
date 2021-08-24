import { Request } from "express";
import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";
import { ResultResponseModel } from "../models/ResultReponse";
import UserRepository from "../repository/UserRepository";
import { IFinancialControlApp } from "./applicationInterfaces/IFinancialControlApp";
import { isNull, isNumber, isUndefined, isBoolean, isEmpty } from "lodash";
import FinancialControlRepository from "../repository/FinancialControlRepository";
import FinancialControl from "../models/FinancialControl";

class UserApp implements IFinancialControlApp {
  async create(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();
    let validateRequest: ResultResponseModel = new ResultResponseModel();

    validateRequest = this.validateRequest(req);

    if (!validateRequest.success) {
      return validateRequest;
    }

    const user = await UserRepository.findId(req);

    if (!user) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const financialControl: FinancialControl =
      await FinancialControlRepository.create(req, user);

    if (!financialControl) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    delete financialControl.user;

    response.success = true;
    response.result = financialControl;

    return response;
  }

  validateRequest(req: Request) {
    let response: ResultResponseModel = new ResultResponseModel();
    response.success = true;

    const { userId } = req;
    const { name, income, value } = req.body;

    if (isEmpty(userId) || isNull(userId) || isUndefined(userId)) {
      response.success = false;
      response.errors.push({
        message: "Usuário invalido",
      });
    }

    if (isEmpty(name) || isNull(name) || isUndefined(name)) {
      response.success = false;
      response.errors.push({
        message: "Nome é obrigatório",
      });
    }

    if (isNull(income) || isUndefined(income) || !isBoolean(income)) {
      response.success = false;
      response.errors.push({
        message: "Tipo de operação invalida",
      });
    }

    if (isNull(value) || isUndefined(value) || !isNumber(value)) {
      response.success = false;
      response.errors.push({
        message: "Valor especificado não é válido",
      });
    }

    if (!response.success) {
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      return response;
    }

    response.success = true;

    return response;
  }
}

export default new UserApp();
