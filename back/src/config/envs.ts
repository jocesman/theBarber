//require("dotenv").config();  <- esto es exactamente lo mismo que lo sgte ...
import "dotenv/config"; 

export const PORT = process.env.PORT;
export const DB_TIPO = process.env.TIPO;
export const DB_HOST = process.env.HOST;
export const DB_PORT2 = parseInt(String(process.env.PORT2));
export const DB_USERNAMES =  process.env.USERNAMES;
export const DB_PASSWORDS = process.env.PASSWORDS;
export const DB_DATABASE = process.env.DATABASE;

