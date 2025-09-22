import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Mongo db connected successfully");
        })
        connection.on('error',(err)=>{
            console.log("Error while connecting the database",err);
            process.exit();
        })

    } catch (error:any) {
        console.log("Failed to connected to database",error)
    }
}