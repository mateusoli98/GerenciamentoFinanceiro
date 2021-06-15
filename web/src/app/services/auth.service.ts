import { RoutesEnum } from 'src/app/enums/routes.unum';
import { Router } from '@angular/router';
import {
  AccountRequest,
  LoginRequest,
} from './../models/request/authRequest.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/response/authResponse.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(user: LoginRequest) {
    const result: LoginResponse = await this.http
      .post<LoginResponse>(`${environment.api}/auth`, user)
      .toPromise();

    if (result) {
      window.localStorage.setItem('token', result.token);
      return true;
    }

    return false;
  }

  async createAccount(user: AccountRequest) {
    return this.http.post(`${environment.api}/users`, user);
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
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
    window.localStorage.removeItem('token');
    this.router.navigate([RoutesEnum.Login]);
  }
}
