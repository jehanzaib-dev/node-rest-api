import { postModel } from "../models/postModel.js";

const createPost=async(req, res)=>{

	try{
		const post=await postModel.create(req.body);
		res.status(201).json({message:"post created successfully",post:post});
	}
	catch(err){
		console.log("ERROR Occured:", err);
  res.status(500).json({ message: err.message });
	}
}


export {createPost}