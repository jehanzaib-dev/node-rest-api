import express from 'express';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/authRoutes.js';



const app=express();

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authRouter);

export default app;