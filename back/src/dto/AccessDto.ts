interface AccessDto {
    accessUserPhone: string; // Cambiado a string para manejar formatos de teléfono
    accessUserEmail: string; // Mantiene string para correos electrónicos
    accessUserPassword: string; // Cambiado a string para manejar passwords
    accessLastVisit: Date; // Mantiene Date para timestamps
};

export default AccessDto;