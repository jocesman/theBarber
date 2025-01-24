import { DataSource } from "typeorm";
import { Users } from "../entities/Users";
import { AccessControl } from "../entities/AccessControl";
import { Appointments } from "../entities/Appointments";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "appoinments",
    synchronize: false, //si està en true inicializa las tablas de la base de datos
    logging: false, //si està en true muestra la consulta en consola
    entities: [Users, AccessControl, Appointments],
    subscribers: [],
    migrations: []
})