import { DataSource } from "typeorm";
import { Users } from "../entities/Users";
import { AccessControl } from "../entities/AccessControl";
import { Appointments } from "../entities/Appointments";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    //dropSchema: true, //si està en true inicializa las tablas de la base de datos
    synchronize: true, 
    logging: false, //si està en true muestra la consulta en consola
    entities: [Users, AccessControl, Appointments],
    subscribers: [],
    migrations: []
})
