import Attendance from "../models/Attendance.model.js";
import Employee from "../models/Employee.model.js";

export const addAttendance = async (req , res) => {
    try{
        const {employeeName , date , status , timeIn , timeOut , bonus , note} = req.body;
        
        if(!employeeName || !date || !status || !timeIn || !timeOut)
            return res.status(401).json({message:"Please fill all the required fields."});

        const employee = await Employee.findOne({employeeName});
        
        if(!employee)
            return res.status(401).json({message:"Employee not found."});

        const attendance = await Attendance.create(employee._id , date , status , timeIn , timeOut , bonus , note);

        res.status(201).json({message:"Attendance added successfully", attendance});

    }
    catch(error){
        return res.status(501).json({message:"Failed to add attendance."});
    }
}