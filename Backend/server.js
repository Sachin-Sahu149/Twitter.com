import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import userRoutes from './Routes/user.routes.js'
import postRoutes from './Routes/post.routes.js'
import notificationRoute from './Routes/notification.routes.js'
import connectMongoDB from './DB/connectMongoDb.js';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
cloudinary.config({
    cloud_name: 'dy4qbhh0m',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const _dirname = path.resolve();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/notifications',notificationRoute);

app.use((err, req, res, next) => {
    console.log("Something went wrong : ", err);
    res.status(500).json({
        success: false,
        error: "error occured"
    })
})

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(_dirname,'/Frontend/dist')));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'Frontend','dist','index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log("server is listening on port :", PORT);
    connectMongoDB();
})