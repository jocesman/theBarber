import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity({
    name: "appointments"
})
export class Appointments {
    @PrimaryGeneratedColumn("increment")
    appointment: number

    @Column()
    appointmentUserPhone: string; // Cambiado a string para manejar formatos de teléfono

    @Column()
    appointmentDate: Date; // Mantiene la fecha completa

    @Column()
    appointmentTime: Date; // Cambiado a string en formato "HH:mm"
    
    @Column({
        enum: ['active', 'cancelled']
    })
    appointmentStatus: 'active' | 'cancelled'; // Representa múltiples estados

    @ManyToOne(() => Users, (user) => user.userPhone)
    // @JoinTable()
    user: Users
    
}