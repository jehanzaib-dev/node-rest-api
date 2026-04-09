import { userModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';


const updateUser = async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    if(req.body.password){
      try{
        const salt=await bcrypt.genSalt(10);
        req.body.password= await bcrypt.hash(req.body.password, salt);
      }
      catch(err){
      console.log("ERROR Occured:", err);
      res.status(500).json({ message: err.message });
      }
    }
    try{
      const user=await userModel.findByIdAndUpdate(req.params.id, req.body,{ returnDocument:"after", runValidators:true
      });
      res.status(200).json({message:"user updated successfully"});
    }
    catch(err){
      console.log("ERROR Occured:", err);
      res.status(500).json({ message: err.message });
    }
  }
  else{
    res.status(403).json({message:"you can only update your own account"});
  }
};
const deleteUser = async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user=await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"user deleted successfully"});
    }
    catch(err){
      console.log("ERROR Occured:", err);
      res.status(500).json({ message: err.message });
    }
  }
  else{
    res.status(403).json({message:"you can only delete your own account"});
  }
};
const getUser= async(req, res)=>{
  try{
    const user=await userModel.findById(req.params.id);
    if(!user) return res.status(400).json({message:"no user found with this id"});
    const {password, updatedAt, ...others}=user._doc;
    res.status(200).json({message:"user found", user:others});
  }
  catch(err){
    console.log("ERROR Occured:", err);
      res.status(500).json({ message: err.message });
  }
};
const followUser=async(req, res)=>{
  if(req.body.userId !== req.params.id){
    try{
      const userToFollow=await userModel.findById(req.body.userId);
      const currentUser=await userModel.findById(req.params.id);
      if(!userToFollow.followers.includes(req.params.id)){
        await currentUser.updateOne({$push:{following:req.body.userId}});
        await userToFollow.updateOne({$push: {followers:req.params.id}});
        
        res.status(200).json({message:"you are now following this user"});

      }
      else{
        res.status(403).json({message:"you are already following this user"});
      }

    }
    catch(err){
    console.log("ERROR Occured:", err);
    res.status(500).json({ message: err.message });}
  }
  else{
    res.status(403).json({message:"you can't follow yourself"});
  }
}
const unFollowUser=async(req, res)=>{
  if(req.body.userId !== req.params.id){
    try{
      const userToUnFollow=await userModel.findById(req.body.userId);
      const currentUser=await userModel.findById(req.params.id);
      if(userToUnFollow.followers.includes(req.params.id)){
        await currentUser.updateOne({$pull:{following:req.body.userId}});
        await userToUnFollow.updateOne({$pull: {followers:req.params.id}});
        
        res.status(200).json({message:"you have un followed this user"});

      }
      else{
        res.status(403).json({message:"you are not following this user"});
      }

    }
    catch(err){
    console.log("ERROR Occured:", err);
    res.status(500).json({ message: err.message });}
  }
  else{
    res.status(403).json({message:"you can't unfollow yourself"});
  }
}

export {updateUser, deleteUser, getUser, followUser, unFollowUser}











