import { Notification } from "../Model/notification.model.js";



export const getNotifications = async(req,res)=>{
    try {
        let userID = req.user._id;

        let notification = await Notification.find({to:userID})
        .populate({path:"to",select:['username','profileImg']})

        if(!notification){
            return res.status(404).json({error:"Notification not found"});
        }

        await Notification.updateMany({to:userID},{read:true})

        console.log("Notification :",notification);
        return res.status(200).json(notification);

    } catch (error) {
        console.log("Error in getNotification controller : ",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const deleteNotifications = async(req,res)=>{
    try {
        let userID = req.user._id;
        await Notification.deleteMany({to:userID});
        return res.status(200).json({message:"Deleted successfully"});
        
    } catch (error) {
        console.log("Error in deleteNotifications controller : ",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}


export const deleteNotification = async(req,res)=>{

    try {
        let notificationID = req.params.id;
        let userID = req.user._id;
        let notification = await Notification.findById(notificationID);

        console.log("Message in notification @@:",notification);

        if(!notification){
            return res.status(404).json({error:"Notification not found"});
        }

        if(notification.to.toString()!==userID.toString()){
            return res.status(403).json({error:"You are not allowed to delete this notification"});
        }

        await Notification.findByIdAndDelete(notificationID);
        
        return res.status(200).json({message:"Notification deleted successfully"});
        
    } catch (error) {
        console.log("Error in deleteNotification controller : ",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

