export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccountRequest extends LoginRequest {
  name: string;
}
