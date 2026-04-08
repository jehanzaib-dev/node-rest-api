import { Router } from "express";
import {updateUser } from "../controller/userController.js";

const userRouter=Router();

userRouter.route("/:id").put(updateUser);

export default userRouter;
