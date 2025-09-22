import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels'
import { NextResponse,NextRequest } from 'next/server'
import bcrypt from 'bcrypt'


connect(); // db connection 1st step

export async function POST(request:NextRequest){
    try {

        // extraction
        const reqBody = await request.json();
        const{username,password,email} = reqBody;

        console.log(reqBody);

        // validations
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        // response on success 
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}


