import server from "./server";
import { PORT } from "./config/envs";

server.listen(PORT, () => {
    console.log(`Estoy escuchando en el puerto ${PORT}`)
})