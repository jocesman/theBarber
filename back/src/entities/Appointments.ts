

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "appointments"
})
export class Appoinments {
    @PrimaryColumn()
    appointmentUserPhone: string; // Cambiado a string para manejar formatos de teléfono
    @Column()
    appointmentDate: Date; // Mantiene la fecha completa
    @Column()
    appointmentTime: Date; // Cambiado a string en formato "HH:mm"
    @Column({
        enum: ['completed', 'cancelled']
    })
    appointmentStatus: 'completed' | 'cancelled'; // Representa múltiples estados
}