import mongoose from "mongoose";

const connectMongoDB = async()=>{
    try {
        
        const cnn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected:",cnn.connection.host);
    } catch (error) {
        console.error(`Error:${error.message}`);
    }
}

export default connectMongoDB;