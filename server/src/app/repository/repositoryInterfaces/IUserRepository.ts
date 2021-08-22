import { Request } from "express";
import { ResultResponseModel } from "../../models/ResultReponse";
import User from "../../models/User";

export interface IUserRepository {
  find(req: Request): Promise<User | null>;
  create(req: Request): Promise<User | null>;
}
