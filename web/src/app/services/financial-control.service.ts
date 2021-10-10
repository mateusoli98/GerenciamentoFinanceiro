import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicesRoutesEnum } from '../enums/routes.enum';
import { FinancialControlRequest } from '../models/request/financialControl.model';
import {
  FinancialControlBalance,
  FinancialControlResponse,
} from '../models/response/financialControlResponse.model';
import { LineChartResponse } from '../models/response/lineChartResponse';

@Injectable({
  providedIn: 'root',
})
export class FinancialControlService {
  constructor(private http: HttpClient) {}

  async create(request: FinancialControlRequest) {
    return this.http.post<FinancialControlResponse>(
      `${environment.api}/${ServicesRoutesEnum.FinancialControl}`,
      request
    );
  }

  async getByUser() {
    return this.http.get<Array<FinancialControlResponse>>(
      `${environment.api}/${ServicesRoutesEnum.FinancialControl}`
    );
  }

  async getBalance() {
    return this.http.get<FinancialControlBalance>(
      `${environment.api}/${ServicesRoutesEnum.FinancialControlBalance}`
    );
  }

  async getChartCurrentMonth(currentDate: string) {
    return this.http.get<LineChartResponse>(
      `${environment.api}/${ServicesRoutesEnum.FinancialControlChartCurrentMonth}`,
      { params: { currentDate } }
    );
  }

  async deleteFinancialControl(financialControlGuid: string) {
    return this.http.delete(
      `${environment.api}/${ServicesRoutesEnum.FinancialControl}`,
      {
        params: { financialControlGuid },
      }
    );
  }

  async updateFinancialControl(request: FinancialControlRequest) {
    return this.http.put<FinancialControlResponse>(
      `${environment.api}/${ServicesRoutesEnum.FinancialControl}`,
      request
    );
  }
}
