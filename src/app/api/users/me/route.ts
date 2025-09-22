import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        // Connect to database
        await connect();

        // Get token from cookies
        const token = request.cookies.get("token")?.value || '';
        
        if (!token) {
            return NextResponse.json(
                { error: "No token provided" }, 
                { status: 401 }
            );
        }

        // Verify token
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        
        // Find user in database (exclude password)
        const user = await User.findById(decodedToken.id).select("-password");
        
        if (!user) {
            return NextResponse.json(
                { error: "User not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User data retrieved successfully",
            success: true,
            data: user
        });

    } catch (error: any) {
        console.error("Error in me endpoint:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json(
                { error: "Invalid token" }, 
                { status: 401 }
            );
        }
        
        if (error.name === 'TokenExpiredError') {
            return NextResponse.json(
                { error: "Token expired" }, 
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}