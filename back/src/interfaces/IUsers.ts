/*interface IUser {
    id: string,
    userName: string,
    userEmail: string,
    userPhone: number
};*/

interface IUser {
    
    name: string;
    email: string,
    birthdate: string,
    nDni: number,
    
}


//interface IUser {
//    id: number,
//    name: string;
//    email: string,
 //   birthdate: Date;
 //   nDni: number,
  //  credentialId: number
//}

export default IUser;


/*User

id: ID numérico que identifica al usuario.

name: nombre completo del usuario.

email: dirección de email del usuario.

birthdate: fecha de nacimiento.

nDni: número de DNI o identificación.

credentialsId: ID de las credenciales, referencia al par de credenciales que posee el usuario.*/
