import { Notification } from "../Model/notification.model.js";
import { Post } from "../Model/post.modal.js";
import User from "../Model/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async(req,res)=>{
    
    try {
        
        const {text} = req.body;
        let { image} = req.body;

        const userID = req.user._id;

        let user = await User.findById(userID);
        
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        
        if(!text && !image){
            return res.status(400).json({error:"Post must have text/image or both"});
        }

        if(image){
            const uploadResult = await cloudinary.uploader.upload(image);
            image = uploadResult.secure_url;
        }

        const newPost = new Post({
            user:userID,
            text,
            image
        })

        const post = await newPost.save();
        console.log("Newly created post ",post);

        return res.status(201).json(post);

    } catch (error) {
        console.log("Error in create post controller :",error.message );
        return res.status(500).json({error:"Internal server error"})
    }
}

export const deletePost = async(req,res)=>{
    console.log("Delete post controller")
    try {
           const{postID} = req.params;
           
           const post = await Post.findById(postID);

           if(!post){
            return res.status(404).json({error:"Post not found"})
           }

           if(post.user.toString()!==req.user._id.toString()){
            return res.status(400).json({error:"You are not allowed to delete this post"});
           }

           if(post.image){
            let imageID = post.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imageID);
           }

           await Post.findByIdAndDelete(post._id);
           
           return res.status(200).json({
            message:"Post deleted successfully"
           })

    } catch (error) {
        console.log("Error in deletePost cotroller :",error.message);
        return res.status(500).json({
            error:"Internal server error",
        })
    }
}

export const commentOnPost = async(req,res)=>{
    
    try {
        let postID = req.params.id;
        let userID = req.user._id;
        const {text} = req.body;

        let post = await Post.findById(postID);

        if(!post){
            return res.status(404).json({error:"Post not found"});
        }

        // if(post.user.toString() === userID.toString()){
        //     return res.status(400).json({error:"You cannot comment on your post"});
        // }

        if(!text) return res.status(400).json({error:"Text is required"});

        let comment = {user:userID,text}

        post.comments.push(comment);

        await post.save();

        return res.status(200).json(post)
        
    } catch (error) {
        console.log("Error in comment controller :",error.message);
        return res.status(500).json({
            error:"Internal server error",
        })
    }
}

export const likeUnLikePost = async(req,res)=>{
    try {
        let postID = req.params.id;
        const userID = req.user._id;

        let post = await Post.findById(postID);
        
        if(!post)return res.status(404).json({error:"Post not found"});
         

        let isLike = post.likes.includes(userID);

        if(isLike){
            // unlike the post

            await Post.findByIdAndUpdate(postID,{$pull:{likes:userID}});
            await User.findByIdAndUpdate(userID,{$pull:{likedPost:postID}})

        }else{
            await Post.findByIdAndUpdate(postID,{$push:{likes:userID}});
            await User.findByIdAndUpdate(userID,{$push:{likedPost:postID}});

            const newNotification = new Notification({
                from:userID,
                to:post.user,
                type:"like"
            })
            await newNotification.save();
        }
        return res.status(200).json({message:"Liked post successfully"});
        
    } catch (error) {
        console.log("Error in likeUnlike post controller : ",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const allPost = async(req,res)=>{

    try {
        
        let post = await Post.find().sort({createdAt:-1})
        .populate({path:'user',select:'-password'})
        .populate({path:"comments.user",select:["-password","-email"]});

        return res.status(200).json(post);

    } catch (error) {
        console.log("Error in allPost controller :",error.message);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

export const getLikedPost = async(req,res)=>{
    try {
        const userID = req.user._id;

        const user = await User.findById(user);

        let likedPost = await Post.find({_id:{$in:user.likedPost}})
        .sort({createdAt:-1})
        .populate({path:'user',select:'-password'})
        .populate({path:"comments.user",select:["-password","-email"]});

        return res.status(200).json(likedPost);
        
    } catch (error) {
        console.log('Error in getLikedpost controller :',error.message);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

export const getFollowedPost = async(req,res)=>{

    try {
        const userID = req.user._id;

        let user = await User.findById(userID);

        let allPost = await Post.find({user:{$in:user.following}})
        .populate({path:'user',select:"-password"})
        .populate({path:'comments.user',select:'-password'});

        return res.status(200).json(allPost);
        
    } catch (error) {
        console.log("Error in getFollowedPost controller :",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const getUsersPost = async(req,res)=>{
    
    try {
        let {username} = req.params;
        
        let user = await User.find({username:username});
        if(!user){
            return res.status(404).json({error:"This username doesn't exist"})
        }
        console.log("user : ",user[0]);

        // let allPost = await Post.find({user:user._id})
        let allPost = await Post.find({user:user[0]._id});
        
        return res.status(200).json(allPost)
        
    } catch (error) {
        console.log("Error in getUsersPost controllers :",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}