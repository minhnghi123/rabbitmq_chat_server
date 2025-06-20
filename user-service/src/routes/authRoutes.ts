import { Router } from "express";
import AuthController from "../controllers/AuthController";

const userRouter = Router();

userRouter.post("/register", (req, res) => {
  AuthController.register(req, res);
});
userRouter.post("/login", (req, res) => {
  AuthController.login(req, res);
});

export default userRouter;
