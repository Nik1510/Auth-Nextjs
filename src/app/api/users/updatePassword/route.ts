import { NextResponse, NextRequest } from "next/server"
import User from "@/models/userModels"
import bcrypt from "bcrypt"
import { connect } from "@/dbConfig/dbConfig"

connect()

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Missing token or password" }, { status: 400 })
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    
    const hashed = await bcrypt.hash(newPassword, 10)
    user.password = hashed

    
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 })
  }
}
