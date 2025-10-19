import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId ,ref:'Employee' , required:true},
    date:{type:Date , required:true , default:Date.now},
    status:{type:String , enum:['P','A','HD'] , required:true , default:'P'},
    timeIn:{type:String , default:null},
    timeOut:{type:String , default:null},
    bonus:{type:Number , default:0},
    stitches:{type:Number , default:0},
    note:{type:String , default:''}
    },
    {timestamps:true}
);

export default mongoose.model('Attendance' , attendanceSchema);