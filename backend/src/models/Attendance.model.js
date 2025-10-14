import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId ,ref:'Employee' , required:true},
    date:{type:Date , required:true , default:date.now},
    status:{type:String , enum:['p','a','hd'] , required:true , default:'p'},
    timeIn:{type:Time , default:null},
    timeOut:{type:Time , default:null},
    bonus:{type:Number , default:0},
    note:{type:String , default:''}
    },
    {timestamps:true}
);

export default mongoose.model('Attendance' , attendanceSchema);