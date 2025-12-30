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
            date: {$gte:startDate , $lt: endDate},
        })
        
        const latestAttendance = await Attendance.findOne({
            employeeId: employee._id,
            date: {$gte:startDate , $lt: endDate},
        }).sort({updatedAt: -1});

        let salary = await Salary.findOne({
            employeeId : employee._id,
            month : monthIndex,
            year : year
        })

        if (salary && latestAttendance &&latestAttendance.updatedAt < salary.lastCalculatedAt && employee.advancesUpdatedAt < salary.lastCalculatedAt) {

        return res.json({
            exist: true,
            employeeId: salary.employeeId,
            month: salary.month,
            year: salary.year,
            presentDays: salary.presentDays,
            absentDays: salary.absentDays,
            halfDays: salary.halfDays,
            extraDays: salary.extraDays,
            bonuses: salary.bonuses,
            advances: salary.advances,
            netSalary: salary.netSalary
        });
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
                let prevDate = new Date(date);
                prevDate.set(date.getDate() - 1);
                let nextDate = new Date(date);
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
        netSalary = (presentDays * perDaySalary) + extraSalary - deductions;
        const totalDays = presentDays + (halfDays/2) - absentDays - unpaidSundays;

        if(!salary){
            salary = await Salary.create({
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
                netSalary: netSalary,
                lastCalculatedAt: new Date(),
            })
        }
        else{
            salary.totalDays = totalDays,
            salary.presentDays = presentDays,
            salary.absentDays = absentDays,
            salary.halfDays = halfDays,
            salary.extraDays = extraDays,
            salary.bonuses = bonuses,
            salary.advances = advances,
            salary.netSalary = netSalary,
            salary.lastCalculatedAt = new Date(),
            await salary.save();
        }

        res.json({message: "Salary calculated successfully",salary});
    }
    catch(error){
        console.error("Calculate Salary error:", error);
        return res.status(500).json({ message: "Server error, failed to calculate salary." });
    }
};