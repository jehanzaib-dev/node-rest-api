import { Router } from "express";
import {updateUser } from "../controller/userController.js";

const userRouter=Router();

userRouter.route("/update/:id").put(updateUser);

export default userRouter;
