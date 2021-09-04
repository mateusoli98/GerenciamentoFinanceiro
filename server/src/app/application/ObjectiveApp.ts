import { Request } from "express";
import { isDate, isEmpty, isNull, isNumber, isUndefined } from "lodash";
import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";
import Objective from "../models/Objectives";
import { ResultResponseModel } from "../models/ResultReponse";
import ObjectiveRepository from "../repository/ObjectiveRepository";
import UserRepository from "../repository/UserRepository";
import { IObjectiveApp } from "./applicationInterfaces/IObjectiveApp";

class UserApp implements IObjectiveApp {
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

    const objetive: Objective = await ObjectiveRepository.create(req, user);

    if (!objetive) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    delete objetive.user;

    response.success = true;
    response.result = objetive;

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

    const objectives: Array<Objective> = await ObjectiveRepository.getByUser(user);

    if (!objectives) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    objectives.forEach((obj) => delete obj.user);

    response.success = true;
    response.result = objectives;

    return response;
  }

  async delete(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const { objectiveGuid } = req.query;

    const objective: Objective = await ObjectiveRepository.find(objectiveGuid as string);
    if (!objective) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Objetivo não encontrado",
      });

      return response;
    }

    const result: boolean = await ObjectiveRepository.delete(objective);

    if (result) {
      response.success = true;
      response.result = {
        message: "Operação realizada com sucesso!",
      };
    } else {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.result = {
        message: "Erro interno no servidor!",
      };
    }

    return response;
  }

  async update(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();
    let validateRequest: ResultResponseModel = new ResultResponseModel();

    validateRequest = this.validateRequest(req, true);

    if (!validateRequest.success) {
      return validateRequest;
    }

    const { objectiveGuid } = req.body;

    const objectiveBefore: Objective = await ObjectiveRepository.find(objectiveGuid);

    if (!objectiveBefore) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.NotFound;
      response.errors.push({
        message: "Objetivo não encontrada",
      });

      return response;
    }

    const objectiveAfter: Objective = req.body;

    const result = await ObjectiveRepository.update(objectiveBefore, objectiveAfter);

    if (!result) {
      response.success = false;
      response.result = {
        message: "Não foi possível atualizar o objetivo!",
      };
    }

    response.success = true;
    response.result = result;

    return response;
  }

  validateRequest(req: Request, isUpdated?: boolean) {
    let response: ResultResponseModel = new ResultResponseModel();
    response.success = true;

    const { userId } = req;
    const { name, objectiveGuid, totalValue, dateFinal } = req.body;

    if (isUpdated) {
      if (isEmpty(objectiveGuid) || isNull(objectiveGuid) || isUndefined(objectiveGuid)) {
        response.success = false;
        response.errors.push({
          message: "Objetivo invalido",
        });
      }
    }

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

    if (isNull(totalValue) || isUndefined(totalValue) || !isNumber(totalValue)) {
      response.success = false;
      response.errors.push({
        message: "Valor total é obrigatório",
      });
    }

    if (isEmpty(dateFinal) || isNull(dateFinal) || isUndefined(dateFinal) || !isDate(new Date(dateFinal))) {
      response.success = false;
      response.errors.push({
        message: "Data final é obrigatório",
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
