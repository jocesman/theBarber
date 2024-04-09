import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { log } from "console";

AppDataSource.initialize()
.then(res=> {
    log('Se ha establecido con éxito la conexión a la base de datos');
    server.listen(PORT, () => {
        log(`Server listening on port ${PORT}`)
    })
});