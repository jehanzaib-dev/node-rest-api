import { Router } from "express";
import { registerUser, loginUser } from "../controller/authController.js";

const authRouter=Router();
authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);

export default authRouter;