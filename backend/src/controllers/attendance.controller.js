import Attendance from "../models/Attendance.model.js";

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

export const viewAttendance = () => {

}