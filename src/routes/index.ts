import { Router } from "express";
import UserController from "../controllers/userController";
import errorHandler from "../middlewares/errorHandler";
import authentication from "../middlewares/authentication";
import TransactionController from "../controllers/transactionController";
import { OverviewController } from "../controllers/overviewController";
const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/transaction", TransactionController.getAllTransaction)
router.post("/transaction/create", TransactionController.createTransaction)
router.get("/overview", OverviewController.getOverview)

router.use(errorHandler);

export default router;
