import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (_, res) => res.send('Hello From Backend'));

export default server;
