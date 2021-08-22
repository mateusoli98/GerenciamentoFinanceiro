import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";

import User from "../models/User";

class UserController {
  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { name, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(httpStatusCodeEnum.Conflict);
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);

    delete user.password;
    delete user.id;

    return res.json(user);
  }
}

export default new UserController();
