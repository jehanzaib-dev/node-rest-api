import { userModel } from "../models/userModel.js";

const registerUser=async (req,res) => {
    try {
        const {username, email, password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"all fields are required"});
        }
        const alreadyPresent=await userModel.findOne({email:email.toLowerCase()});
        if(alreadyPresent){
            return res.status(400).json({message:"user already exists"});
        }
        const user = await  userModel.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn:false
        });
        res.status(201).json({message:"user created successfully", user:{id:user._id, email:user.email, username:user.username}});

    } catch (err) {
        console.log("ERROR Occured:", err);
  res.status(500).json({ message: err.message });
    }    
};
const loginUser=async(req, res)=>{

    try{

        const {email, password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"all fields are required"});
        }

        const user= await userModel.findOne({email:email.toLowerCase()});
        if(!user)
            return res.status(400).json({message:"user not found"});
        
        const isMatch=await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({message:"invalid password"})

        res.status(200).json({message:"user logged in successfully",
            user}
            );

    }
    catch(err){
        console.log("ERROR Occured:", err);
  res.status(500).json({ message: err.message });
    }
};

export {
    registerUser, loginUser
}
