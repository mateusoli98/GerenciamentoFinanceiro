import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicesRoutesEnum } from '../enums/routes.enum';
import {  PlanningRequest } from '../models/request/planningRequest.model';
import { PlanningResponse } from '../models/response/planningResponse.model';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  constructor(private http: HttpClient) {}
  
  async create(request: PlanningRequest) {
    return this.http.post<PlanningResponse>(
      `${environment.api}/${ServicesRoutesEnum.Planning}`,
      request
    );
  }

  async getByUser() {
    const isGrouped = 'false';

    return this.http.get<Array<PlanningResponse>>(
      `${environment.api}/${ServicesRoutesEnum.Planning}`,
      { params: { isGrouped } }
    );
  }

  async delete(planningGuid: string) {
    return this.http.delete(
      `${environment.api}/${ServicesRoutesEnum.Planning}`,
      {
        params: { planningGuid },
      }
    );
  }

  async update(request: PlanningRequest) {
    return this.http.put<PlanningResponse>(
      `${environment.api}/${ServicesRoutesEnum.Planning}`,
      request
    );
  }
}
