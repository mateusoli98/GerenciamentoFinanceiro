import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";

import { RoutesEnum } from "./app/enums/routes.enum";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";

const router = Router();

router.post(RoutesEnum.SignUp, UserController.store);
router.post(RoutesEnum.Login, AuthController.authenticate);

export default router;
