import User from "@/models/userModels";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;

         const user = await User.findOne({email}).select("-password");
         console.log(user)
         return NextResponse.json({message:"profile"},{status:200})
         
    } catch (error:any) {
        console.log("Error while fetching the data in profile",error.message)
    }

}