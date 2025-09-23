import nodemailer from 'nodemailer'
import User from '@/models/userModels'
import bcrypt from 'bcrypt'

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10);
        
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
            verifyToken:hashedToken,
            verifyTokenExpiry:Date.now()+3600000
        })
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now()+3600000
        })
        }


        // now the code is copied from mailtrap doc
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const isVerify = emailType === "VERIFY"
const baseUrl = process.env.DOMAIN

const html = isVerify? 
    `<p>
      Click <a href="${baseUrl}/verifyemail?token=${hashedToken}">here</a> to verify your email,
      or copy and paste the link below in your browser.<br>
      ${baseUrl}/verifyemail?token=${hashedToken}
    </p>`
    : 
    `<p>
      Click <a href="${baseUrl}/updatePassword?token=${hashedToken}">here</a> to reset your password,
      or copy and paste the link below in your browser.<br>
      ${baseUrl}/updatePassword?token=${hashedToken}
    </p>`

        const mailOptions = {
        from: 'nikhilshaw575@gmail.com',
        to: email,
        subject: isVerify ? 'Verify your email' : 'Reset your password',
        html
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error:any) {
        console.log(error.message);
    }
}