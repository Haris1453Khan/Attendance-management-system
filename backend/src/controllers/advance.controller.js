import Employee from '../models/Employee.model.js';

export const addAdvance = async (req , res) => {
    try{
        const {date , name , amount , note} = req.body;

        const employee = await Employee.findOne({name});
        if (!employee)
            return res.status(404).json({message:"Employee not found"});

        const newAdvance = {
            amount,
            date,
            note : note || "-"
        };

        employee.advances.push(newAdvance);
        employee.advancesUpdatedAt = new Date();
        await employee.save();

        return res.status(200).json({message:"Advance added Successfully"});
    }
    catch(error){
        console.error("Failed while adding advance. Server Error." , error);
        return res.status(500).json({message:"Failed while adding advance. Server Error."})
    }
};

export const viewAdvance = async (req , res) => {
    try{
        const {month , name} = req.query;

        if(!month || !name)
            return res.status(400).json({message:"Please fill all the required fields"});

        const startDate = new Date(month);
        const endDate = new Date(startDate.getFullYear() , startDate.getMonth()+1 , 1);

        const employee = await Employee.findOne({name});
        if(!employee)
            return res.status(404).json({message:"Employee not found"});

        const monthlyAdvances = employee.advances.filter(
            (adv) => new Date(adv.date) >= startDate && new Date(adv.date) < endDate
        );

        if(monthlyAdvances.length === 0)
            return res.status(200).json({message:"No advances found for this month"});

        return res.status(200).json(monthlyAdvances);

    }
    catch(error){
        console.error("Error fetching advances:", error);
        return res.status(500).json({ message: "Server error while fetching advances" });
    }
};

export const deleteAdvance = async (req , res) => {
    try{
        const {date , name} = req.query;

        if(!date || !name)
            return res.status(400).json({message:"Please fill all the required fields"});

        const employee = await Employee.findOne({name});
        if(!employee)
            return res.status(404).json({message:"Employee not found"});

        const dateToDelete = new Date(date);

        const newAdvances = employee.advances.filter(
            (adv) => new Date(adv.date).toDateString() !== dateToDelete.toDateString()
        );

        if(employee.advances.length === newAdvances.length)
            return res.status(404).json({message:"No advances found for this date"});

        employee.advances = newAdvances;
        employee.advancesUpdatedAt = new Date();
        await employee.save();

        return res.status(200).json("Advance Deleted Sucessfully.");

    }
    catch(error){
        console.error("Error deleting advances:", error);
        return res.status(500).json({ message: "Server error while deleting advances" });
    }
};