
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");

dotenv.config();

const connectDB= async()=>{
    try{
        const connectionInstance=await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDB connected !!! ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("error occured", error);
        process.exit(1);
    }
}


app.listen(8800,()=>{
	console.log("server running successfully");
})

connectDB();