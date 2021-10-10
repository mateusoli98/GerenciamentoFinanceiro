import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicesRoutesEnum } from '../enums/routes.enum';
import { ObjectiveRequest } from '../models/request/objectiveRequest.model';
import { ObjectiveResponse } from '../models/response/objectiveResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveService {
  constructor(private http: HttpClient) {}

  async create(request: ObjectiveRequest) {
    return this.http.post<ObjectiveResponse>(
      `${environment.api}/${ServicesRoutesEnum.Objective}`,
      request
    );
  }

  async getByUser() {
    return this.http.get<Array<ObjectiveResponse>>(`${environment.api}/${ServicesRoutesEnum.Objective}`);
  }

  async delete(objectiveGuid: string) {
    return this.http.delete(
      `${environment.api}/${ServicesRoutesEnum.Objective}`,
      {
        params: { objectiveGuid },
      }
    );
  }

  async update(request: ObjectiveRequest) {
    return this.http.put(
      `${environment.api}/${ServicesRoutesEnum.Objective}`,
      request
    );
  }
}
