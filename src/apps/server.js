import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import errorHandler from "../middlewares/errorHandler.js";
import jobRouter from "../routers/jobRouter.js";
import candidateRouter from "../routers/candidateRouter.js";
import authRouter from "../routers/authRouter.js";

const server = express();

server.use(cors({ credentials: true, origin: ["http://34.128.73.230:5173", "http://34.128.73.230:5174"] }));
server.use(helmet());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (_, res) => res.send("Hello From Backend"));
server.use("/jobs", jobRouter);
server.use("/candidates", candidateRouter);
server.use("/auth", authRouter);

server.use(errorHandler);

export default server;
