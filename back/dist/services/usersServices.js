"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserServices = exports.getUserServices = exports.createUserServices = void 0;
const users = [];
const id = "1234";
const createUserServices = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // recibo los datos del usuario
    // creo un nuevo usuario
    // incluir el nuevo usuario en el arreglo
    // retornar el objeto creado
    const newUser = {
        id,
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPhone: userData.userPhone
    };
    users.push(newUser);
    return newUser;
});
exports.createUserServices = createUserServices;
const getUserServices = () => __awaiter(void 0, void 0, void 0, function* () {
    return users;
});
exports.getUserServices = getUserServices;
const deleteUserServices = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteUserServices = deleteUserServices;
