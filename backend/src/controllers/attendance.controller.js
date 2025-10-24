import Attendance from "../models/Attendance.model.js";
import Employee from "../models/Employee.model.js"

export const addAttendance = async (req , res) => {
    try{
        const {date , records} = req.body;
        
        if(!date || !records)
            return res.status(404).json({message:"Please fill all the required fields."});
        await Promise.all(records.map( async (record) => {
            const filter = {
                employeeId : record.employeeId,
                date: date
            }
            const update = {
                status: record.status,
                timeIn: record.timeIn,
                timeOut : record.timeOut,
                bonus: record.bonus,
                stitches: record.stitches,
                note: record.note
            }

            await Attendance.findOneAndUpdate(filter , update ,{ upsert:true , new:true})
        }));
        

        res.status(201).json({message:"Attendance added successfully"});

    }
    catch(error){
        console.error("Bulk attendance error:", error);
        return res.status(500).json({message:"Server error, Failed to add attendance."});
    }
};

export const viewAttendance = async (req , res) => {
    try{
        console.log("view Attendance called");
        const {month , empName} = req.query;

        if(!month || !empName)
            return res.status(404).json({message:"Plese enter all the required fields."});

        const employee = await Employee.findOne({name : empName})
        if (!employee) 
            return res.status(404).json({ message: "Employee not found" });

        const startDate = new Date(month);

        const year = startDate.getFullYear();

        const monthIndex = startDate.getMonth();

        const endDate = new Date(year , monthIndex+1 , 1);

        const attendance = await Attendance.find({
            employeeId : employee._id,
            date:{ $gte: startDate, $lt: endDate }
        })

        if(attendance.length === 0 || !attendance)
            return res.status(404).json({message:"No attendance found"})

        return res.status(200).json(attendance);
    }
    catch(error){
        console.log("view Attendance called");
        console.error("View attendance error:", error);
        return res.status(500).json({ message: "Server error, failed to fetch attendance." });
    }
}

export const deleteAttendance = async (req , res) => {
    try{
        const {date , name} = req.query;

        if(!date || !name)
            return res.status(400).json({message:"Please fill add the required fields"});

        const employee = await Employee.findOne({name});

        if(!employee)
            return res.status(404).json({message:"Employee not found."});

        // const dateToDelete = new Date(date);

        const isDelete = await Attendance.deleteOne({
            employeeId : employee._id ,
            date:date
            })

        if(isDelete.deletedCount === 0)
            return res.status(400).json({message:"Failed to delete attendance"});

        return res.status(200).json({message:"Attendance record deleted successfully."});

    }
    catch(error){
        console.error("Failed while deleting attendance. Server Error.", error)
        return res.status(500).json({message:"Failed while deleting attendance. Server Error."});
    }

};