import User from "../Model/user.model.js"
import jwt from 'jsonwebtoken'


export const protectRoute = async(req,res,next)=>{
    console.log("called protectRoute ---------");
    try {
        const token = req.cookies.jwt;
        // console.log("Token in protect route : ",token)
        if(!token){
            return res.status(401).json({
                error:"Unauthorized:No token provided"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded,'decoded');

        if(!decoded){
            return res.status(401).json({
                error:"Unauthorized:invalid token"
            })
        }

        const user = await User.findById(decoded.user_id).select("-password");

        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protect route middleware:",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}