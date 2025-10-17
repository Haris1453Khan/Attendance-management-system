import Employees from '../models/Employee.model.js'

export const addEmployee = async (req , res) => {

    try{
        console.log(req.body);
        const {name , phone , baseSalary , joinDate , isActive} = req.body;

        const isNameExist = await Employees.findOne({name});
        if(isNameExist)
            return res.status(400).json({message:"Employee already exist."});

        const isPhoneExist = await Employees.findOne({phone});
        if(isPhoneExist)
            return res.status(400).json({message:"Employee already exist with same Phone."});

        const employee = await Employees.create({name , phone , baseSalary , joinDate ,isActive});

        return res.json({name: employee.name , message: "Employee Add successfully."})
    }
    catch(error){
        console.log("addEmployee Called..");
        res.status(500).json({message:"Failed to add employee. Server error."})
    }
};

export const deleteEmployee = async (req , res) => {
    try{
        const {id} = req.params;
        const employee = await Employees.findByIdAndDelete(id);
        
        if(!employee)
            return res.status(400).json({message:"Employee not found."});

        res.status(200).json({message:"Employee deleted successfully."})
    }
    catch(error){
        res.status(500).json({message:"Unable to delete employee. Server error."});
    }
}

export const updateEmployee = async (req , res) => {
    try{
        const {id} = req.params;
        const {name , phone , joinDate , baseSalary , isActive} = req.body;
        const employee = await Employees.findById({_id:id});
        
        if(!employee)
            return res.status(400).json({message:"Employee not Found."});

        const isNameExist = await Employees.findOne({name});
        if(isNameExist && (isNameExist._id != id))
            return res.status(400).json({message:"Please use different name, This name already exist."});

        const isPhoneExist = await Employees.findOne({phone});
        if(isPhoneExist && (isPhoneExist._id != id))
            return res.status(400).json({message:"Please use different phone, This number already exist."});

        const isUpdate = await Employees.updateOne({name , phone , joinDate , baseSalary , isActive});

        if(!isUpdate)
            return res.status(400).json({message:"Unable to update Employee."});

        return res.status(200).json({message:"Employee Updated Successfully."})

    }
    catch(error){
        res.status(500).json({message:"Unable to delete employee. Server error."});
    }
}

export const fetchEmployee = async (req , res) => {
    try{
        const employees = await Employees.find();
        if(!employees || employees.length === 0)
            return res.status(400).json({message:"No Employee found, Please add Employees."});

        return res.status(200).json(employees);
    }
    catch(error){
        return res.status(500).json({message:"Server Error while fetching employees."});
    }
}