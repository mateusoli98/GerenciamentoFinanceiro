import { Request } from "express";

import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";
import { ResultResponseModel } from "../models/ResultReponse";
import UserRepository from "../repository/UserRepository";
import { IFinancialControlApp } from "./applicationInterfaces/IFinancialControlApp";
import { isNull, isNumber, isUndefined, isBoolean, isEmpty } from "lodash";
import FinancialControlRepository from "../repository/FinancialControlRepository";
import FinancialControl from "../models/FinancialControl";
import { LineChartResponse } from "../models/LineChart";

class UserApp implements IFinancialControlApp {
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

    const financialControl: FinancialControl = await FinancialControlRepository.create(req, user);

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

    const user = await UserRepository.findRequestId(req);

    if (!user) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const { firstDay, lastDay } = this.getFirstAndLastDayMonth(new Date());

    const financialControls: Array<FinancialControl> = await FinancialControlRepository.getByUser(
      user,
      firstDay.toISOString(),
      lastDay.toISOString()
    );

    if (!financialControls) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    financialControls.forEach((f) => {
      delete f.user;
      f.value = Number(f.value);
    });

    response.success = true;
    response.result = financialControls;

    return response;
  }

  async getChartCurrentMonth(req: Request): Promise<ResultResponseModel> {
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

    const { currentDate } = req.query;

    const isValidateCurrentMonth = this.validateCurrentMonth(currentDate as string);

    if (!isValidateCurrentMonth) {
      return isValidateCurrentMonth;
    }

    const { firstDay, lastDay } = this.getFirstAndLastDayMonth(new Date(currentDate as any));

    const financialControls: Array<FinancialControl> = await FinancialControlRepository.getCurrentMonth(
      user,
      firstDay.toISOString(),
      lastDay.toISOString()
    );

    if (!financialControls) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    financialControls.forEach((fin) => (fin.value = Number(fin.value)));

    response.success = true;
    response.result = this.getLineChart(financialControls);

    return response;
  }

  async getBalance(req: Request): Promise<ResultResponseModel> {
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

    let total: number = 0;
    let totalRevenue: number = 0;
    let totalOutgoing: number = 0;

    const { firstDay, lastDay } = this.getFirstAndLastDayMonth(new Date());
    const financialControls: Array<FinancialControl> = await FinancialControlRepository.getAll(user, firstDay.toISOString(), lastDay.toISOString());

    if (financialControls && financialControls.length > 0) {
      financialControls.forEach((fc) => (fc.value = Number(fc.value)));

      financialControls.forEach((fc) => {
        const { value, income } = fc;

        total += value;

        if (income) {
          totalRevenue += value;
        } else {
          totalOutgoing += value;
        }
      });
    } else {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    response.success = true;
    response.result = {
      total,
      totalRevenue,
      totalOutgoing,
    };

    return response;
  }

  async deleteFinancialControl(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    const { financialControlGuid } = req.query;

    const financialControl: FinancialControl = await FinancialControlRepository.find(financialControlGuid as string);

    if (!financialControl) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      response.errors.push({
        message: "Erro interno no servidor",
      });

      return response;
    }

    const result: boolean = await FinancialControlRepository.deleteFinancialControl(financialControl);

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

  async updateFinancialControl(req: Request): Promise<ResultResponseModel> {
    let response: ResultResponseModel = new ResultResponseModel();

    let validateRequest: ResultResponseModel = new ResultResponseModel();

    validateRequest = this.validateRequest(req, true);

    if (!validateRequest.success) {
      return validateRequest;
    }

    const { financialControlGuid } = req.body;

    const financialControlBefore: FinancialControl = await FinancialControlRepository.find(financialControlGuid);

    if (!financialControlBefore) {
      response.success = false;
      response.statusCode = httpStatusCodeEnum.NotFound;
      response.errors.push({
        message: "Receita/despeza não encontrada",
      });

      return response;
    }

    const financialControlAfter: FinancialControl = req.body;

    const result = await FinancialControlRepository.updateFinancialControl(financialControlBefore, financialControlAfter);

    if (!result) {
      response.success = false;
      response.result = {
        message: "Não foi possível atualizar receita/despesa!",
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
    const { name, income, value, financialControlGuid } = req.body;

    if (isUpdated) {
      if (isEmpty(financialControlGuid) || isNull(financialControlGuid) || isUndefined(financialControlGuid)) {
        response.success = false;
        response.errors.push({
          message: "Receita/despesa invalida",
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

  validateCurrentMonth(dateRequest: string) {
    let response: ResultResponseModel = new ResultResponseModel();
    response.success = true;

    const date = new Date();
    const currentDateRequest = new Date(dateRequest);

    if (date.getFullYear() != currentDateRequest.getFullYear()) {
      response.success = false;
      response.errors.push({
        message: "Ano invalido. Por favor, pesquisar pelo ano corrente",
      });
    } else if (date.getMonth() != currentDateRequest.getMonth()) {
      response.success = false;
      response.errors.push({
        message: "Mês invalido. Por favor, pesquisar pelo mês corrente",
      });
    }

    if (!response.success) {
      response.statusCode = httpStatusCodeEnum.InternalServerError;
      return response;
    }

    return response;
  }

  getFirstAndLastDayMonth(currentDate: Date) {
    var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    return {
      firstDay,
      lastDay,
    };
  }

  getLineChart(financialControls: Array<FinancialControl>): LineChartResponse {
    let chart: LineChartResponse = {
      title: { text: "Progresso do mês atual" },
      chart: {
        height: 350,
        type: "line",
      },
      series: [
        { name: "Receitas", color: "#0bcc0b", data: [] },
        { name: "Despesas", color: "#fb5454", data: [] },
      ],
      xaxis: {
        categories: [],
      },
    };

    financialControls.forEach((financial: FinancialControl) => {
      const { created_at, income, value } = financial;
      const day = created_at.getDate();
      const month = created_at.getMonth() + 1;
      const catetory = `${day}/${month}`;

      const findCatetory = chart.xaxis.categories.find((c: string) => c == catetory);

      if (!findCatetory) {
        chart.xaxis.categories.push(catetory);
        chart.series[income ? 0 : 1].data.push(Number(value));
        chart.series[!income ? 0 : 1].data.push(0);
      } else if (findCatetory) {
        let lengthCategories = chart.xaxis.categories.length;
        let indexCategories = lengthCategories == 0 ? lengthCategories : lengthCategories - 1;
        let valueRevenue = chart.series[0].data[indexCategories] ?? undefined;
        let valueOutgoing = chart.series[1].data[indexCategories] ?? undefined;

        if (income) {
          chart.series[0].data[indexCategories] = valueRevenue ? valueRevenue + value : value;
          chart.series[1].data[indexCategories] = valueOutgoing ? valueOutgoing + 0 : 0;
        } else {
          chart.series[0].data[indexCategories] = valueRevenue ? valueRevenue + 0 : 0;
          chart.series[1].data[indexCategories] = valueOutgoing ? valueOutgoing + value : value;
        }
      }
    });

    return chart;
  }
}

export default new UserApp();
