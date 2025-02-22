import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { AccessControl } from "./AccessControl"
import { Appointments } from "./Appointments"

@Entity({
    name: "users"
})
export class Users {
    @PrimaryColumn()
    userPhone : string // Cambiado a string para manejar formatos de teléfono

    @Column({
        length: 50
    })
    userName: string

    @Column({
        length: 50
    })
    userLastName: string

    @Column()
    userBirthDate: Date

    @Column({
        length: 18
    })
    userId: string // Mantiene string, válido para UUID o identificadores alfanuméricos

    @Column({
        length: 100
    })
    userEmail: string // Mantiene string para correos electrónicos

    @Column({
        length: 150
    })
    userAddress: string// Puede incluir más especificaciones si se necesitan

    @Column({
        length: 50
    })
    userCity: string // Mantiene string

    @Column({
        default: new Date()
    })
    userDateCreated: Date // Mantiene Date para timestamps

    @Column({
        default: 'active'
    })
    userStatus: 'active' | 'inactive' // Cambiado a unión para manejar más estados
    
    @Column({
        enum: ['admin', 'user']
    })
    userTypeUser: 'admin' | 'user' // Cambiado a unión para manejar más tipos de usuarios

    @OneToOne(() => AccessControl)
    @JoinColumn()
    accessControl: AccessControl
     // Cambiado a string para manejar formatos de teléfono

     @OneToMany(() => Appointments, (appointment) => appointment.user)
     appointments: Appointments[]
}


