import { Request } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import { IUserRepository } from "./repositoryInterfaces/IUserRepository";

class UserRepository implements IUserRepository {
  async find(req: Request): Promise<User | null> {
    const repository = getRepository(User);
    const { email } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) return null;

    return user;
  }

  async create(req: Request): Promise<User | null> {
    const repository = getRepository(User);
    const { firstName, lastName, email, password } = req.body;

    const user = repository.create({ firstName, lastName, email, password });
    await repository.save(user);

    return user;
  }
}

export default new UserRepository();
