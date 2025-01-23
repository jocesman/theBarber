interface IUser {
    userPhone: string; // Cambiado a string para manejar formatos de teléfono
    userName: string;
    userLastName: string;
    userId: string; // Mantiene string, válido para UUID o identificadores alfanuméricos
    userBirthDate: Date;
    userEmail: string; // Mantiene string para correos electrónicos
    userAddress: string; // Puede incluir más especificaciones si se necesitan
    userCity: string; // Mantiene string
    userDateCreated: Date; // Mantiene Date para timestamps
    userStatus: 'active' | 'inactive'; // Cambiado a unión para manejar más estados
    userTypeUser: 'admin' | 'user'; // Cambiado a unión para manejar más tipos de usuarios
}

export default IUser;
