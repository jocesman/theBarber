interface AppointmentDto {
    appointmentUserPhone: string; // Cambiado a string para manejar formatos de teléfono
    appointmentDate: Date; // Mantiene la fecha completa
    appointmentTime: Date; // Cambiado a string en formato "HH:mm"
    appointmentStatus: 'active' | 'cancelled'; // Representa múltiples estados
}

export default AppointmentDto;