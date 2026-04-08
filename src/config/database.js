import mongoose from 'mongoose';

const connectMongoDB= async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`mongoDB connected !!! ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("error occured", error);
        process.exit(1);
    }
}

export default connectMongoDB;
