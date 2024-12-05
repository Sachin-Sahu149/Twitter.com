import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import connectMongoDB from './DB/connectMongoDb.js';

const app  = express();
dotenv.config();


app.use('/api/auth',authRoutes);

const PORT = process.env.PORT ||5000;




app.listen(PORT,()=>{
    console.log("server is listening on port :",PORT);
    connectMongoDB();
})