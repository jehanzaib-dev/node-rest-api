import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema=new Schema({
	username:{
		type:String,
		required:true,
		min:3,
		max:20,
		unique:true
	},
	email:{
		type:String,
		required:true,
		max:50,
		unique:true
	},
	password:{
		type:String,
		required:true,
		min:6
	},
	profilePicture:{
		type:String,
		default:""
	},
	coverPicture:{
		type:String,
		default:""
	},
	followers:{
		type:Array,
		default:[]
	},
	following:{
		type:Array,
		default:[]
	},
	isAdmin:{
		type:Boolean,
		default:false,
	},
	desc:{
		type:String,
		max:50
	},
	from:{
		type:String,
		max:50
	},
	relationship:{
		type:Number,
		enum:[1,2,3]
	}

},
{ 
	timestamps:true
}
);
 //hash passwords
    userSchema.pre("save", async function (){
        if(!this.isModified("password")) return;
        this.password=await bcrypt.hash(this.password, 10);
    });
//compare passwords
    userSchema.methods.comparePassword=async function (password){
        return await bcrypt.compare(password, this.password)
    }


export const userModel=mongoose.model("user", userSchema);







