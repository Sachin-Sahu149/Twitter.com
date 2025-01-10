import { Notification } from "../Model/notification.model.js";
import User from "../Model/user.model.js";
import bcrypt from 'bcryptjs'
import validator from 'validator';
import {v2 as cloudinary} from 'cloudinary'
import isEmail from "validator/lib/isEmail.js";

export const getUserProfile = async(req,res)=>{
    const {username} = req.params;

    try {
        console.log(username);
        const user = await User.findOne({username}).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in user control:",error.message);
        return res.status(500).json({error:error.message});
    }
}
export const followUnfollowUser = async(req,res)=>{
    console.log("request recieved")
    try {
        const {id} = req.params;

        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        console.log("userToModify:",userToModify);
        console.log("currentUser :",currentUser);
    
        if(!userToModify || !currentUser)return res.status(400).json({error:"User not found"});

        console.log(`id:${id}, req.user.id:${req.user._id}`);

        if(id.toString()===req.user._id.toString()){
            return res.status(400).json({error:"You can't follow/unfollow yourself"})
        }

        const isFollowing = currentUser.following.includes(id);
        console.log("isFollowing : ",isFollowing);

        if(isFollowing){
            //unfollow the user
            const updatedUser =  await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}},{new:true});
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});
            //send notification

            // const newNotification = new Notification({
            //     type:"follow",
            //     from:currentUser._id,
            //     to:userToModify._id
            // });

            // await newNotification.save();

            res.status(200).json(updatedUser);

        }else{
            // follow the user

            const updatedUser = await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}},{new:true});
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}});
            //send notification

            const newNotification = new Notification({
                type:"follow",
                from:currentUser._id,
                to:userToModify._id
            });

            await newNotification.save();

            //todo return the id as a response

            res.status(200).json(updatedUser);

        }

    } catch (error) {
        console.log("Error in user followUnfollow control:",error.message);
        return res.status(500).json({error:error.message});
    }
}

export const getSuggestedUser = async(req,res)=>{
    try {

        const userID = req.user._id;
        
        let userFollowedByMe = await User.findById(userID).select("following");

        // console.log("Following of current user :",userFollowedByMe);

        const users = await User.aggregate([
            {
                $match:{
                    _id:{$ne:userID}
                }
            },
            {
                $sample:{
                    size:15
                }
            }
        ])
        // console.log("user :",users);
        
        let filteredUser = users.filter(user=>{
            return !userFollowedByMe.following.includes(user._id);
        })
        // console.log("filteredUser:",filteredUser.slice(0,1));

        let suggestedUsers = filteredUser.slice(0,8);

      suggestedUsers.forEach(user=>{
            return user.password = null;
        })

        res.status(200).json({
            suggestedUsers
        })
        
    } catch (error) {
        console.log("Error in getSuggested controller :",error)
        return res.status(500).json({
            error:error.message
        })
    }
}

export const updateUserProfile = async(req,res)=>{
    const{fullName,username,email,currentPassword,newPassword,bio,link} = req.body;
    
    try {

        let{profileImg,coverImg} = req.body;
        const userID = req.user._id;

        let user = await User.findById(userID);

        if(!user){
            res.status(404).json({
                error:"User not found"
            })
        }

        // change password
        if((!currentPassword && newPassword) || (currentPassword && !newPassword)){
            return res.status(400).json({error:"Provide both new and current password"})
        }

        if(currentPassword && newPassword){
            let isMatch = await bcrypt.compare(currentPassword,user.password);
            if(!isMatch)return res.status(400).json({error:"Password is incorrect"});
            
            if(newPassword.length<8){
                return res.status(400).json({error:'password must be at least 8 character long'})
            }

            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(newPassword,salt);
            console.log("old password:",user.password);
            
            console.log("Password changed");
            user.password = hashedPassword;
            // let updated = await User.findByIdAndUpdate(userID,{password:hashedPassword});
            let updated = await user.save();
        
            console.log("Updated user password : ",updated.password);
            return res.status(200).json({
                message:"Password changed successfully",
            })
        }

        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0]);
            }
            const uploadResult = await cloudinary.uploader.upload(profileImg)
            console.log("profile images upload result :",uploadResult);
            profileImg = uploadResult.secure_url;
        }

        if(coverImg){

            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0]);
            }

            const uploadResult = await cloudinary.uploader.upload(coverImg);
            console.log("cover image uload result :",uploadResult);
            coverImg = uploadResult.secure_url;
            
        }
        //validate email
        if(email){
            if(!isEmail(email)){
                return res.status(400).json({
                    error:"Email is not valid"
                })
            }
        }

        user.username = username || user.username;
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        
        user = await user.save();
        // don't send password client side 
        user.password = null;

        res.status(200).json({
            message:"Profile updated successfully",
            user
        })
        
    } catch (error) {
        console.log("Error in update user profile controller :",error.message);
        return res.status(500).json({
            error:error.message,
        })
    }
}