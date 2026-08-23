import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';

let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }
    try {
        if (!process.env.MONGODB_URI) {
            console.error("CRITICAL ERROR: MONGODB_URI is not defined in process.env!");
        }
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = !!connectionInstance.connections[0].readyState;
        console.log(`Data Base Connect Successfully **** with: ${connectionInstance.connection.name}`);
    } catch (error) {
         console.error("Data base connection failed !!!!! ", error);
         isConnected = false;
         throw error;
    }
};

export default connectDB;