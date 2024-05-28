import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '../middlewares/errorHandler.js';

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (_, res) => res.send('Hello From Backend'));

server.use(errorHandler);

export default server;
