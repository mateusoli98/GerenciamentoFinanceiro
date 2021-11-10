import { Request } from "express";
import { isArray, isBoolean, isEmpty } from "lodash";
import { isNull, isUndefined, isNumber, isDate } from "lodash";
import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";
import { ResultResponseModel } from "../models/ResultReponse";
import UserRepository from "../repository/UserRepository";
import { IPlanningApp } from "./applicationInterfaces/IPlanningApp";
import Planning from "../models/Planning";
import PlanningRepository from "../repository/PlanningRepository";
import PlanningItem from "../models/PlanningItem";
import PlanningItemRepository from "../repository/PlanningItemRepository";
import MemberRepository from "../repository/MemberRepository";

import User from "../models/User";

class PlanningApp implements IPlanningApp {
  async create(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    let validateRequest: ResultResponseModel = new ResultResponseModel();

    validateRequest = this.validateRequest(req);

    if (!validateRequest.success) {
      return validateRequest;
    }

    const user = await UserRepository.findRequestId(req);

    if (!user) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const planning: Planning = await PlanningRepository.create(req, user);

    if (!planning) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const { planningItems } = req.body;

    if (!isUndefined(planningItems) && isArray(planningItems) && planningItems.length > 0) {
      planningItems.forEach(async (item: PlanningItem) => {
        await PlanningItemRepository.create(item, planning);
      });
    }

    const { members, isGrouped } = req.body;

    if (isBoolean(isGrouped) && isGrouped) {
      if (!isUndefined(members) && isArray(members) && members.length > 0) {
        members.forEach(async (userGuid: string) => {
          await MemberRepository.create(userGuid, planning.planningGuid);
        });
      }
    }

    delete planning.user;

    response.success = true;
    response.result = planning;

    return response;
  }

  async getByUser(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const user = await UserRepository.findRequestId(req);

    if (!user) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const { isGrouped } = req.query;

    const planningIsGrouped: boolean = String(isGrouped).toLowerCase() == "true" ? true : false;

    const plannings: Array<Planning> = await this.getPlannings(user, planningIsGrouped);

    response.success = true;
    response.result = plannings;

    return response;
  }

  async getPlannings(user: User, isGrouped: boolean): Promise<Array<Planning>> {
    const plannings: Array<Planning> = await PlanningRepository.getByUser(user, isGrouped);
    const planningsResponse: Array<Planning> = await this.includePlanningItems(plannings);

    return planningsResponse;
  }

  async includePlanningItems(plannings: Array<Planning>): Promise<Array<Planning>> {
    const planningsTemp: Array<Planning> = plannings;

    planningsTemp.forEach((p) => (p.value = Number(p.value)));

    let count = 1;

    planningsTemp.forEach(async (item: Planning) => {
      let planning: Planning = await PlanningRepository.find(item.planningGuid);

      if (planning) {
        let planningItems: Array<PlanningItem> = await PlanningItemRepository.getByPlanning(planning);

        item.planningItems = new Array<PlanningItem>();

        planningItems.forEach((planningItem) => {
          planningItem.totalValue = Number(planningItem.totalValue);
          planningItem.entryValue = Number(planningItem.entryValue);
          planningItem.category = Number(planningItem.category);

          item.planningItems.push({ ...planningItem });
        });
      }

      count++;
    });

    let time = 1000;

    await new Promise((resolve) => setTimeout(resolve, count > plannings.length ? 0 : (time += 100)));

    return planningsTemp;
  }

  async delete(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const { planningGuid } = req.query;

    const planning: Planning = await PlanningRepository.find(planningGuid as string);

    if (!planning) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Planejamento não encontrado",
      });

      return response;
    }

    const resultPlanningItems: boolean = await PlanningItemRepository.delete(planning.planningGuid);

    if (resultPlanningItems) {
      const result: boolean = await PlanningRepository.delete(planning);

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

    const { planningGuid } = req.body;

    const planning: Planning = await PlanningRepository.find(planningGuid);

    if (!planning) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.NotFound;
      response.errors.push({
        message: "Planejamento não encontrado",
      });

      return response;
    }

    const { planningItems } = req.body;

    if (!isUndefined(planningItems) && isArray(planningItems) && planningItems.length > 0) {
      planningItems.forEach(async (item: PlanningItem) => {
        if (!item.planningItemGuid) {
          await PlanningItemRepository.create(item, planning);
        } else {
          await PlanningItemRepository.update(item, planning);
        }
      });
    }

    response.success = true;
    response.result = {
      message: "Planejamento atualizado com sucesso",
    };

    return response;
  }

  validateRequest(req: Request, isUpdated?: boolean) {
    let response: ResultResponseModel = new ResultResponseModel();
    response.success = true;

    const { userId } = req;
    const { planningGuid, name, value, dateFinal, isGrouped } = req.body;

    if (isUpdated) {
      if (isEmpty(planningGuid) || isNull(planningGuid) || isUndefined(planningGuid)) {
        response.success = false;
        response.errors.push({
          message: "Planejamento invalido",
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

    if (isNull(value) || isUndefined(value) || !isNumber(value)) {
      response.success = false;
      response.errors.push({
        message: "Valor é obrigatório",
      });
    }

    if (isNull(isGrouped) || isUndefined(isGrouped) || !isBoolean(isGrouped)) {
      response.success = false;
      response.errors.push({
        message: "Tipo de planejamento (grupo/pessoal) está invalido",
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

export default new PlanningApp();
