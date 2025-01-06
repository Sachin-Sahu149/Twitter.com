import validator from "validator";
import User from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { generateTokenAndSetCookie } from "../../lib/utils/generateToken.js";

export const signup = async(req,res)=>{
    
    try {
        const {fullName,username,email,password} = req.body;

        if(!validator.isEmail(email)){
            return res.status(400).json({error:"Invalid email format"});
        }

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({error:"Username is already exist"});
        }

        const existingEmail = await User.findOne({email});

        if(existingEmail){
            return res.status(400).json({error:"Email is already exist"});
        }
        
        if(password.length<8){
            return res.status(400).json({error:"Password must be at least of 8 character"});
        }

        if(!fullName){
            return res.status(400).json({error:"Please provide your full name"});
        }

        // hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log("Hashed Password :",hashedPassword);

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            email
        });
        console.log("newUser :",newUser);

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            console.log("res in signup controller: ",res.cookie);
            await newUser.save();
            newUser.password = null;
            res.status(200).json({success:true,message:'User created successfully',
                user:{
                ...newUser._doc
                }
            });
        }else{
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller :",error.message);
        throw error;
    }
}

export const login = async(req,res)=>{

    const{username,password} = req.body;

    console.log("username:",username,"password:",password);////////
    try {

        
        if(!username || !password)return res.status(400).json({success:false,
            error:"fill all required details"            
        })
        
        const user = await User.findOne({username});
        console.log(user,"user in login");
        if(!user){
           return res.status(404).json({
                error:"This username doesn't exist"
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({error:"Password is not correct"})
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({message:"Logged in successfully",
        //     _id:user._id,
        //     username:user.username,
        //   email:user.email,
        //   password:user.password,
        //   follower:user.followers,
        //   following:user.following,
        //   coverImage:user.coverImg,
        //   profileImg:user.profileImg  

        })
        
    } catch (error) {
        console.log("Error in login controller : ",error.message);
        res.status(500).json({
            error:"Internal server error"
        })
        
    }
}
export const signout = async(req,res)=>{
    try {
        console.log("user logged out :",req.cookies.jwt,"---------")
        res.cookie("jwt","",{
            maxAge:0,
        })
        res.status(200).json({
            message:"Signed out successfully"
        })

    } catch (error) {
        console.log("Error in signout controller : ",error.message);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}

export const getme = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getme controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}