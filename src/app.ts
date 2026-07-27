import express from "express";
import { errorHandler } from "./middleware/error.middleware.js";

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

//Error Handling Middleware
app.use(errorHandler);

export default app;