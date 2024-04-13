import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { log } from "console";
import { reloadData } from "./helpers/reloadData";

AppDataSource.initialize()
.then(res=> {
    log('Conexión a la Base de Datos establecida');
    reloadData()
    .then(res =>
        server.listen(PORT, () => {
            log(`Server listening on port ${PORT}`)
        })
    )
});