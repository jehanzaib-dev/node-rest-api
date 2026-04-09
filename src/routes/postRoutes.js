import { Router } from "express";
import {createPost} from "../controller/postController.js";

const postRouter=Router();

postRouter.route("/create").post(createPost);


export default postRouter;