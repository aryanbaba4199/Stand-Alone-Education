import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;


const connectDb = async()=>{
    try{
        if(mongoose.connection.readyState===1){
            console.log('Already connected to database');
            console.log(mongoose.Collection)
            return;
        }
        await mongoose.connect(uri)
        
        console.log('Connected to database', mongoose.connection.name);
    }catch(err){
        console.error('Error in connecting to database',err);
    }
}
export default connectDb;