import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { newsRouter } from "./routes/news";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/news", newsRouter)

export default app;
