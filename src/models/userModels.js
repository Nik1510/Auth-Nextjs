import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide the username"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide the password"]
    },
    email:{
        type:String,
        required:[true,"Please provide the email"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;