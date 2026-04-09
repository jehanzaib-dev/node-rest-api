import { Router } from "express";
import {updateUser, deleteUser, getUser, followUser, unFollowUser} from "../controller/userController.js";

const userRouter=Router();

userRouter.route("/update/:id").put(updateUser);
userRouter.route("/delete/:id").delete(deleteUser);
userRouter.route("/get/:id").get(getUser);
userRouter.route("/:id/follow").put(followUser);
userRouter.route("/:id/unfollow").put(unFollowUser);

export default userRouter;
