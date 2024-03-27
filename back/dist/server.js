"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const server = (0, express_1.default)();
// Configura Morgan como middleware antes de configurar las rutas
server.use((0, morgan_1.default)('dev'));
// Middleware para analizar el cuerpo de las solicitudes entrantes como JSON
server.use(express_1.default.json());
// Configura las rutas
server.use(routes_1.default);
exports.default = server;
