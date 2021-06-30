import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(httpStatusCodeEnum.Unauthorized);
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(httpStatusCodeEnum.Unauthorized);
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_OR_PRIVATE_KEY, {
      expiresIn: "1d",
    });

    delete user.password;

    return res.json({
      user,
      token,
    });
  }
}

export default new AuthController();
