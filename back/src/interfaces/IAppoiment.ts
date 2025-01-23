interface IAppoiment {
    appoinmentUserPhone: string; // Cambiado a string para manejar formatos de teléfono
    appoinmentDate: Date; // Mantiene la fecha completa
    appoinmentTime: string; // Cambiado a string en formato "HH:mm"
    appoinmentStatus: 'completed' | 'cancelled'; // Representa múltiples estados
}

export default IAppoiment;