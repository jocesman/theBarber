
import express from "express";
import router from "./routes";
import morgan from "morgan";

const server = express();

// Configura Morgan como middleware antes de configurar las rutas
server.use(morgan('dev'));

// Middleware para analizar el cuerpo de las solicitudes entrantes como JSON
server.use(express.json());

// Configura las rutas
server.use(router);

export default server;
