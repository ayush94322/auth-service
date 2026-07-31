import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.route.js"

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//health route
app.get("/health", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});
app.use("/api/v1/auth", authRouter);

//Error Handling Middleware
app.use(errorHandler);

export default app;