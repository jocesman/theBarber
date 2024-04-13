
import express from "express";
import router from "./routes/indexRoutes";
import morgan from "morgan";

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(router);

export default server;
