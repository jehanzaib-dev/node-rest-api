import mongoose, {Schema} from 'mongoose';

const postSchema=new Schema(
	{
	userId:{
		type:String,
		required:true 
	},
	desc:{
		type:String,
		max:500
	},
	img:{
		type:String
	},
	likes:{
		type:Array,
		default:[]
	}
},
{ 
	timestamps:true
}
);

export const postModel=mongoose.model("post", postSchema);
