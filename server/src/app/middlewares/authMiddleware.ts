import { Request, Response, NextFunction } from "express";
import { httpStatusCodeEnum } from './../enums/httpStatusCode.enum';
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(httpStatusCodeEnum.UNAUTHORIZED);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const { id } = data as TokenPayload;
    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(httpStatusCodeEnum.UNAUTHORIZED);
  }
}
