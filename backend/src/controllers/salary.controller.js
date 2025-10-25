import Employee from '../models/Employee.model.js';
import Salary from '../models/Salary.model.js';
import Attendance from '../models/Attendance.model.js';

export const calculateSalary = async (req , res) => {
    try{
        const {month , name} = req.body;

        if(!month || !name)
            return res.status(404).json({message:"Plese enter all the required fields."});

        const employee = await Employee.findOne({name : name})
        if (!employee) 
            return res.status(404).json({ message: "Employee not found" });

        const startDate = new Date(`${month}-01`);
        const monthIndex = startDate.getMonth();
        const year = startDate.getFullYear();
        const endDate = new Date(year , monthIndex + 1 , "1");

        const attendance = await Attendance.find({
            employeeId: employee._id,
            date:{
                $gte:startDate,
                $lt:endDate
            }
        })
        if(attendance.length === 0){
            return res.status(404).json({message:"No attendance found for this employee."});
        }

        const monthlyAdvances = employee.advances.filter(
            (adv) => new Date(adv.date) >= startDate && new Date(adv.date) < endDate
        );

        let presentDays = 0, absentDays = 0, halfDays = 0, extraDays = 0, bonuses = 0,     advances = 0, netSalary = 0;
        let unpaidSundays = 0;

        const basicSalary = employee.baseSalary;

        monthlyAdvances.forEach((adv) => {
            if(adv.amount != 0)
                advances += adv.amount;
        })

        const attendanceMap = new Map();
        attendance.forEach(r => {
            const date = new Date(r.date);
            attendanceMap.set(date.toDateString() , r.status);
        });

        attendance.forEach(record => {
            const date = new Date(record.date)
            const day = date.getDay();
            const status = record.status;

            if(day !== 0){
                if(status === "P") presentDays++;
                if(status === "A") absentDays++;
                if(status === "HD") halfDays++;
            }

            if(day === 0){
                const prevDate = new Date(date);
                prevDate.set(date.getDate() - 1);
                const nextDate = new Date(date);
                nextDate.set(date.getDate() + 1);

                const prevStatus = attendanceMap.get(prevDate.toDateString());
                const nextStatus = attendanceMap.get(nextDate.toDateString());

                if(prevStatus === "A" || nextStatus === "A") 
                    unpaidSundays++;

                if(status === "P")
                    extraDays++;
            }
            bonuses += record.bonus || 0;
        })


        const perDaySalary = basicSalary / 30;
        const deductions = (absentDays * perDaySalary) + (halfDays * perDaySalary * 0.5) + advances + (unpaidSundays * perDaySalary);
        const extraSalary = (extraDays * perDaySalary) + bonuses ;
        netSalary = basicSalary + extraSalary - deductions;
        const totalDays = presentDays + (halfDays/2) - absentDays - unpaidSundays;

        const salary = await Salary.create({
            employeeId : employee._id,
            month: monthIndex,
            year: year,
            totalSalary: basicSalary,
            totalDays: totalDays,
            presentDays: presentDays,
            absentDays: absentDays,
            halfDays: halfDays,
            extraDays: extraDays,
            bonuses: bonuses,
            advances: advances,
            netSalary: netSalary
        })

        if(!salary){
            return res.status(400).json({message:"Error while Calculating Salary"});
        }

        return res.status(200).json(salary);

    }
    catch(error){
        console.error("Calculate Salary error:", error);
        return res.status(500).json({ message: "Server error, failed to calculate salary." });
    }
};

export const fetchSalary = async (req , res) => {
    try{
        const {month , name} = req.query;
        
        if(!month || !name)
            return res.status(404).json({message:"Plese enter all the required fields."});

        const employee = await Employee.findOne({name : name})
        if (!employee) 
            return res.status(404).json({ message: "Employee not found" });

        const date = new Date(month);
        const monthNum = date.getMonth();
        const year = date.getFullYear();

        const isSalary = await Salary.findOne({
            employeeId : employee._id,
            month : monthNum,
            year : year
        })

        if(!isSalary){
            return res.status(404).json({exist:false , message:"No salary exist for this employee."})
        }

        res.json({
            employeeId: isSalary.employeeId,
            month: isSalary.month,
            year: isSalary.year,
            presentDays: isSalary.presentDays,
            absentDays: isSalary.absentDays,
            halfDays: isSalary.halfDays,
            extraDays: isSalary.extraDays,
            bonuses: isSalary.bonuses,
            advances: isSalary.advances,
            netSalary: isSalary.netSalary
        });
        
    }
    catch(error){
        console.error("Fetch Salary error:", error);
        return res.status(500).json({ message: "Server error, failed to fetch salary." });
    }
};