import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId , ref:'Employee' , required:true},
    month:{type:String , required:true},
    year:{type:Number , required:true},
    totalSalary:{type:Number , required:true},
    totalDays:{type:Number , required:true , default:30},
    presentDays:{type:Number , required:true , default:0},
    absentDays:{type:Number , required:true , default:0},
    halfDays:{type:Number , required:true , default:0},
    bonuses:{type:Number , required:true , default:0},
    advances:{type:Number , required:true , default:0},
    netSalary:{type:Number , required:true}},
    {
        timestamps:true,
    }
);

export default mongoose.model('Salary' , salarySchema);