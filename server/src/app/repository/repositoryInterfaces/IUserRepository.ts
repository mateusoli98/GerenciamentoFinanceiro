import { Request } from "express";
import User from "../../models/User";

export interface IUserRepository {
  find(req: Request): Promise<User | null>;
  findId(req: Request): Promise<User | null>;
  create(req: Request): Promise<User | null>;
}
