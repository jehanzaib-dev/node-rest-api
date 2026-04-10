import { postModel } from "../models/postModel.js";
import { userModel } from "../models/userModel.js";

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
const updatePost=async(req, res)=>{
	try{
		const post=await postModel.findById(req.params.id);
		if(post.userId === req.body.userId){
			await post.updateOne(req.body);
			res.status(200).json({message:"post updated successfully"});
		}
		else{
			res.status(403).json({message:"you can update only your own posts"});
		}
	}
	catch(err){
		console.log("ERROR Occured:", err);
  		res.status(500).json({ message: err.message });
	}
}
const deletePost=async(req, res)=>{
	try{
		const post=await postModel.findById(req.params.id);
		if(post.userId === req.body.userId){
			await post.deleteOne();
			res.status(200).json({message:"post deleted successfully"});
		}
		else{
			res.status(403).json({message:"you can delete only your own posts"});
		}
	}
	catch(err){
		console.log("ERROR Occured:", err);
  		res.status(500).json({ message: err.message });
	}
}
const reactOnPost=async(req, res)=>{
	try{
		const post=await postModel.findById(req.params.id);
		if(!post.likes.includes(req.body.userId)){
			await post.updateOne({$push:{likes:req.body.userId}});
			res.status(200).json({message:"post liked successfully"});
		}
		else{
			await post.updateOne({$pull:{likes:req.body.userId}});
			res.status(200).json({message:"post unliked successfully"});
		}

	}
	catch(err){
		console.log("ERROR Occured:", err);
  		res.status(500).json({ message: err.message });
	}
}
const getOnePost=async(req, res)=>{
	try{
		const post=await postModel.findById(req.params.id);
		res.status(200).json({message:"post found successfully", post:post});

	}
	catch(err){
		console.log("ERROR Occured:", err);
  		res.status(500).json({ message: err.message });
	}
}
const getTimelinePosts=async(req, res)=>{
	try{
		const currentUser=await userModel.findById(req.body.userId);
		const currentUserPosts=await postModel.find({userId:currentUser._id});
		const friendsPosts=await Promise.all(currentUser.following.map((friendId) => {
			return postModel.find({userId:friendId});
		})
	);
		res.json(currentUserPosts.concat(...friendsPosts));
	}
	catch(err){
		console.log("ERROR Occured:", err);
  		res.status(500).json({ message: err.message });
	}
}


export {createPost, updatePost, deletePost, reactOnPost, getOnePost, getTimelinePosts}
