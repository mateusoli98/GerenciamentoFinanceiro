import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";

import { RoutesEnum } from "./app/enums/routes.enum";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import FinancialControlController from "./app/controllers/FinancialControlController";

const router = Router();

router.post(RoutesEnum.SignUp, UserController.signUp);
router.post(RoutesEnum.Login, AuthController.authenticate);
router.post(
  RoutesEnum.FinancialControl,
  authMiddleware,
  FinancialControlController.create
);

export default router;
