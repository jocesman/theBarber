import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(res => {
    console.log("Conexiòn a la Base de datos establecida");
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch(err => {
    console.log("Error al inicializar la base de datos");
});

