import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name:{type:String , required:true , unique:true,lowercase:true},
    phone:{type:String , required:[true , 'Phone number is required'] , unique:true},
    baseSalary:{type:Number , required:true},
    joinDate:{type:Date , default:Date.now},
    advances:[{
        amount:{type:Number , required:true},
        date:{type:Date , default:Date.now},
        note:{type:String}
    }],
    isActive:{type:Boolean , default:true},
    advancesUpdatedAt:{type:Date , default:Date.now}
    },
    {timestamps:true}
);

export default mongoose.model('Employee' , employeeSchema);