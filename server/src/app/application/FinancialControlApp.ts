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

  async getByUser(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const user = await UserRepository.findId(req);

    if (!user) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const financialControls: Array<FinancialControl> =
      await FinancialControlRepository.getByUser(user);

    if (!financialControls) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    financialControls.forEach((f) => delete f.user);

    response.success = true;
    response.result = financialControls;

    return response;
  }

  async deleteFinancialControl(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const financialControl: FinancialControl =
      await FinancialControlRepository.find(req);

    if (!financialControl) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const result: boolean =
      await FinancialControlRepository.deleteFinancialControl(financialControl);

    if (result) {
      response.success = true;
      response.result = {
        message: "Opera????o realizada com sucesso!",
      };
    } else {
      response.success = false;
      response.result = {
        message: "Erro interno no servidor!",
      };
    }

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
        message: "Usu??rio invalido",
      });
    }

    if (isEmpty(name) || isNull(name) || isUndefined(name)) {
      response.success = false;
      response.errors.push({
        message: "Nome ?? obrigat??rio",
      });
    }

    if (isNull(income) || isUndefined(income) || !isBoolean(income)) {
      response.success = false;
      response.errors.push({
        message: "Tipo de opera????o invalida",
      });
    }

    if (isNull(value) || isUndefined(value) || !isNumber(value)) {
      response.success = false;
      response.errors.push({
        message: "Valor especificado n??o ?? v??lido",
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
