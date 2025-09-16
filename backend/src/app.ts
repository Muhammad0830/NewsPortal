import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { newsRouter } from "./routes/news";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/news", newsRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

export default app;
