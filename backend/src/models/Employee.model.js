import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name:{type:String , required:true , lowercase:true},
    phone:{type:String , required:[true , 'Phone number is required'] , unique:true},
    baseSalary:{type:Number , required:true},
    joinDate:{type:Date , default:Date.now},
    advances:[{
        amount:{type:Number , required:true},
        date:{type:Date , default:Date.now},
        note:{type:String}
    }],
    isActive:{type:Boolean , default:true}
    },
    {timestamps:true}
);

export default mongoose.model('Emplopyee' , employeeSchema);