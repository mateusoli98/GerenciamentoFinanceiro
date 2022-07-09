import { Router } from "express";
import authMiddleware from "./app/middlewares/authMiddleware";
import { RoutesEnum } from "./app/enums/routes.enum";
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import FinancialControlController from "./app/controllers/FinancialControlController";
import ObjectiveController from "./app/controllers/ObjectiveController";
import PlanningController from "./app/controllers/PlanningController";

const router = Router();

// Auth
router.post(RoutesEnum.SignUp, UserController.signUp);
router.post(RoutesEnum.Login, AuthController.authenticate);

// Financial controls
router.post(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.create);
router.get(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.getByUser);
router.get(RoutesEnum.FinancialControlChartCurrentMonth, authMiddleware, FinancialControlController.getChartCurrentMonth);
router.get(RoutesEnum.FinancialControlBalance, authMiddleware, FinancialControlController.getBalance);
router.delete(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.deleteFinancialControl);
router.put(RoutesEnum.FinancialControl, authMiddleware, FinancialControlController.updateFinancialControl);

// Objectives
router.post(RoutesEnum.Objective, authMiddleware, ObjectiveController.create);
router.get(RoutesEnum.Objective, authMiddleware, ObjectiveController.getByUser);
router.delete(RoutesEnum.Objective, authMiddleware, ObjectiveController.delete);
router.put(RoutesEnum.Objective, authMiddleware, ObjectiveController.update);

// Plannings
router.post(RoutesEnum.Planning, authMiddleware, PlanningController.create);
router.get(RoutesEnum.Planning, authMiddleware, PlanningController.getByUser);
router.delete(RoutesEnum.Planning, authMiddleware, PlanningController.delete);
router.put(RoutesEnum.Planning, authMiddleware, PlanningController.update);

export default router;
