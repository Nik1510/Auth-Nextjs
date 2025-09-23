import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels'
import { NextResponse,NextRequest } from 'next/server'
import { sendEmail } from '@/helpers/mailer';
  

connect(); // db connection 1st step

export async function POST(request:NextRequest){
    try {

        // extraction
        const reqBody = await request.json();
        const{email} = reqBody;

        console.log(reqBody);

        // validations
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User doesnot exists"},{status:400});
        }


        
        // response on success
        await sendEmail({email,emailType:"RESET",userId:user._id})
 
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user
        })
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}


