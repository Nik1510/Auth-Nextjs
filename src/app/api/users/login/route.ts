import { NextResponse,NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import User from "@/models/userModels";
import jwt from 'jsonwebtoken'
import {connect} from '@/dbConfig/dbConfig'

connect();

export async function POST(request:NextRequest) {
    try {
    
        // collect information 
        const {email,password} = await request.json();
        // validation
        // if(email.trim().length===0 ||!password ){
        //     return NextResponse.json({error:"Please enter all the creditationals"},{status:500})
        // }
    
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"Please Signup"},{status:500})
        }

        console.log("User exists")
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        // create token data
        const tokenData= {
            id:user._id,
            username:user.username,
            email:user.email
        }
        // create token 
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        // response 
        const response = NextResponse.json({
            message:"Login successfully",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }

}