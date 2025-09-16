import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { newsRouter } from "./routes/news";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://sneakers-l9jb.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/news", newsRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

export default app;
