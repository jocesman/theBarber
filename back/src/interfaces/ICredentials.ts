interface ICredentials {
    
    username: string,
    password: string
    active:boolean,
    createAt:string,
    updateAt: string
}

export default ICredentials;

/*Credential:

id: ID numérico que identifica al par de credenciales.

username:username del usuario que posee las credenciales.

password: password del usuario que posee las credenciales.
*/
