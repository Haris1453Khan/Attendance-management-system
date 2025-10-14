import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

export const protect = (req , res , next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startWith("Bearer")){
        try{
            token = req.headers.authorization.split("")[1];
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.user = User.findById(decode.id).select("-password");
            next();
        }
        catch(error){
            return res.status(401).json({message:"Not Authorized User , Invalid Token.." , error});
        }
    }
    else{
        res.status(401).json({message:"Not authorized , No Token..", error});
    }
} 