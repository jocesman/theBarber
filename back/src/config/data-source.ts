import { DataSource } from "typeorm";
import { User } from "../entities/Users";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Aj161200",
    database: "asignaturno",
    synchronize: true,
    logging: false,     // si lo pongo false no me sale la consulta select en el nodemon
    entities: [User],
    subscribers: [],
    migrations: [],
})