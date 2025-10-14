import {generateToken} from '../utils/generateToken.js';
import User from '../models/User.model.js';

export const registerUser = async (req , res) => {
    try{
        console.log("Register User called");
        const {username , email , password , role} = req.body;

        console.log(req.body);

        const emailToCheck = (email || '').toLowerCase().trim();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToCheck);
        if(!validEmail){
            return res.status(400).json({message:'Please enter a valid email'});
        }

        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({message:'User already exists'});
        }
        const usernameExist =await User.findOne({username});
        if(usernameExist){
            return res.status(400).json({message:'Username already taken'});
        }
        const user = await User.create({username , email , password , role});
        res.status(201).json({
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role,
            token : generateToken(user._id)
        });

    }
    catch(error){
        console.error(error);
        res.status(500).json({message : "Server error"});
    }
};

export const loginUser = async (req , res) => {
    try{
        console.log("Login User called");
        const {username , password} = req.body;
        console.log(req.body);

        const user = await User.findOne({username});
        if(!user) return res.status(404).json({message: "User does not exist"});
        console.log(user.username , user.password);

        const isMatch = await user.isPasswordCorrect(password);
        if(!isMatch) return res.status(401).json({message:"Invalid credentials"});

        res.json({
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role,
            token : generateToken(user._id)
        });
    }
    catch(error){
        return res.status(500).json({message:"Server error"});
    }

};