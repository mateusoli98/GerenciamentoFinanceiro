import { UserResponse } from './userReponse.model';

export interface LoginResponse {
  user: UserResponse;
  token: string;
}
