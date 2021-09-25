import { Request } from "express";
import User from "../../models/User";

export interface IUserRepository {
  find(req: Request): Promise<User | null>;
  findRequestId(req: Request): Promise<User | null>;
  findId(userId: string): Promise<User | null>;
  create(req: Request): Promise<User | null>;
}
