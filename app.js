import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRoutes.js"
import userRouter from "./router/userRoutes.js"
import timelineRouter from "./router/timelineRoutes.js"
import applicationRouter from "./router/softwareApplicationRoutes.js"
import skillRouter from "./router/skillRoutes.js"
import projectRouter from "./router/projectRoutes.js"


const app = express();
dotenv.config({ path: "./config/config.env" })

// 1St MiddleWare
app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}))

// 2nd MiddleWare
app.use(cookieParser());
// 3rd MiddleWare
app.use(express.json());
// 4th MiddleWare
app.use(express.urlencoded({
    extended: true
}))
// 5th MiddleWare
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", //Instead of multer write this to get files
}))




app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", applicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);


dbConnection();
app.use(errorMiddleware)

export default app;