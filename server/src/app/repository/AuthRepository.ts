import { Request } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import { IAuthRepository } from "./repositoryInterfaces/IAuthRepository";

class AuthRepository implements IAuthRepository {
  async authenticate(req: Request): Promise<User> {
    const repository = getRepository(User);
    const { email } = req.body;

    const user = await repository.findOne({ where: { email } });

    return user;
  }
}

export default new AuthRepository();
