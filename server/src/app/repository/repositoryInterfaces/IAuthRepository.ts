import { Request } from "express";
import User from "../../models/User";

export interface IAuthRepository {
  authenticate(req: Request): Promise<User | null>;
}
