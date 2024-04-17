import { DataSource } from "typeorm";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import { DB_TIPO, DB_HOST, DB_USERNAMES, DB_PORT2, DB_PASSWORDS, DB_DATABASE } from "./envs"

const db_tipo = DB_TIPO as "postgres";

export const AppDataSource = new DataSource({
    type: db_tipo,
    host: DB_HOST, 
    port: DB_PORT2,
    username: DB_USERNAMES, 
    password: DB_PASSWORDS,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
    //dropSchema: true
});
