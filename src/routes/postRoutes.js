import { Router } from "express";
import {createPost, updatePost, deletePost, reactOnPost, getOnePost, getTimelinePosts} from "../controller/postController.js";

const postRouter=Router();

postRouter.route("/create").post(createPost);

postRouter.route("/update/:id").put(updatePost);

postRouter.route("/delete/:id").delete(deletePost);

postRouter.route("/react/:id").put(reactOnPost);

postRouter.route("/find/:id").get(getOnePost);

postRouter.route("/timeline").get(getTimelinePosts);

export default postRouter;