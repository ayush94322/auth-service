import express from "express";
import { success } from "zod";

const app = express();

//middlewares
app.use(express.json());

//health route
app.get("/health", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

export default app;