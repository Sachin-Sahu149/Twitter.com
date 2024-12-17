import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import connectMongoDB from './DB/connectMongoDb.js';
import validator from 'validator';
import { generatePassword } from '../UtilityFunction/generatePassword.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/auth',authRoutes);





const PORT = process.env.PORT ||5000;
app.listen(PORT,()=>{
    

    // const password = generatePassword(15);
    // console.log(password)
    // console.log(validator.isStrongPassword(password));
    

    console.log("server is listening on port :",PORT);
    connectMongoDB();
})