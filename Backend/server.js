import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import userRoutes from './Routes/user.routes.js'
import postRoutes from './Routes/post.routes.js'
import notificationRoute from './Routes/notification.routes.js'
import connectMongoDB from './DB/connectMongoDb.js';
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary';
import { generatePassword } from '../UtilityFunction/generatePassword.js';
import cookieParser from 'cookie-parser';
import { v2 } from 'cloudinary';

dotenv.config();
cloudinary.config({
    cloud_name: 'dy4qbhh0m',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {


    // const password = generatePassword(15);
    // console.log(password)
    // console.log(validator.isStrongPassword(password));


    console.log("server is listening on port :", PORT);
    connectMongoDB();
})