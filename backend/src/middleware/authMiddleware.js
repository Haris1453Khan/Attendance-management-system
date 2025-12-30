import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

export const protect = async (req , res , next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token , process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");
            if(!req.user){
                return res.status(401).json({ message: "User not found" });
            }
            next();
        }
        catch(error){
            return res.status(401).json({message:"Not Authorized User , Invalid Token.." , error});
        }
    }
    else{
        res.status(401).json({message:"Not authorized , No Token.."});
    }
} 