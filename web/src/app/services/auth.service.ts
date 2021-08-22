import { RoutesEnum, ServicesRoutesEnum } from 'src/app/enums/routes.enum';
import { Router } from '@angular/router';
import {
  SignUpRequest,
  LoginRequest,
} from './../models/request/authRequest.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/response/authResponse.model';
import jwt_decode from 'jwt-decode';
import {
  cleanLocalStorage,
  getItemLocalStorage,
  setItemLocalStorage,
} from '../utils/utils';
import { LocalStorageEnum } from '../enums/localStorage.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(user: LoginRequest) {
    const result: LoginResponse = await this.http
      .post<LoginResponse>(
        `${environment.api}/${ServicesRoutesEnum.Login}`,
        user
      )
      .toPromise();

    if (result) {
      setItemLocalStorage(LocalStorageEnum.UserToken, result.token);
      return true;
    }

    return false;
  }

  createAccount(user: SignUpRequest) {
    return this.http.post(
      `${environment.api}/${ServicesRoutesEnum.SignUp}`,
      user
    );
  }

  getAuthorizationToken() {
    const token = getItemLocalStorage(LocalStorageEnum.UserToken);
    return token;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (!date) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  logout() {
    cleanLocalStorage();
    this.router.navigate([RoutesEnum.Login]);
  }
}
