import express from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "../middlewares/errorHandler.js";
import jobRouter from "../routers/jobRouter.js";
import candidateRouter from "../routers/candidateRouter.js";

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (_, res) => res.send("Hello From Backend"));
server.use("/jobs", jobRouter);
server.use("/candidates", candidateRouter);

server.use(errorHandler);

export default server;
