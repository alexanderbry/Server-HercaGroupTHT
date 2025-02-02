import { Router } from "express";
import UserController from "../controllers/userController";
import { error } from "console";
import errorHandler from "../middlewares/errorHandler";
const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(errorHandler);

export default router;
