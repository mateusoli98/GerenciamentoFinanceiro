import { Router } from "express";
import authMiddleware from "./app/middlewares/authMiddleware";
import { RoutesEnum } from "./app/enums/routes.enum";
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import FinancialControlController from "./app/controllers/FinancialControlController";
import ObjectiveController from "./app/controllers/ObjectiveController";

const router = Router();

// Auth
router.post(RoutesEnum.SignUp, UserController.signUp);
router.post(RoutesEnum.Login, AuthController.authenticate);

// Finalcial control
router.post(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.create);
router.get(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.getByUser);
router.get(RoutesEnum.FinancialControlChartCurrentMonth, authMiddleware, FinancialControlController.getChartCurrentMonth);
router.delete(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.deleteFinancialControl);
router.put(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.updateFinancialControl);

// Objectives

router.post(RoutesEnum.Objective, authMiddleware, ObjectiveController.create);
router.get(RoutesEnum.Objective, authMiddleware, ObjectiveController.getByUser);
router.delete(RoutesEnum.Objective, authMiddleware, ObjectiveController.delete);
router.put(RoutesEnum.Objective, authMiddleware, ObjectiveController.update);

export default router;
