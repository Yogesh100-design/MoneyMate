import mongoose,{Schema} from "mongoose";

const loginSchema = new Schema({
    email:{
       type:String,
       required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const Login = mongoose.model("Login",loginSchema)

export default Login;