import jwt from 'jsonwebtoken'


export const generateTokenAndSetCookie = (user_id,res)=>{
    const token = jwt.sign({user_id},process.env.JWT_SECRET,{
        expiresIn:'15d'
    });
    console.log("Token :",token);
    res.cookie("jwt",token,{
        maxAge:15*24*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV==="production",
    })
    return token;
}