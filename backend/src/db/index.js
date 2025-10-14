import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Data Base Connect Successfully **** with: ${connectionInstance.connection.name}`)
    }
    catch(error){
         console.error("Data base connection failed !!!!! ", error);
         exit(1);
    }
}

export default connectDB;