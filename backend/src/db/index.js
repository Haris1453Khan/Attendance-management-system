import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        isConnected = !!connectionInstance.connections[0].readyState;
        console.log(`Data Base Connect Successfully **** with: ${connectionInstance.connection.name}`)
    }
    catch(error){
         console.error("Data base connection failed !!!!! ", error);
         process.exit(1);
    }
}

export default connectDB;