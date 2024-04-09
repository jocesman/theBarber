import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"


@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
        userId: number

    @Column({
        length: 100
    })
    name: string

    @Column()
    email: string

    @Column()
    birthdate: Date

    @Column()
    nDni: number

    @Column()
    credentialId: number

    @OneToMany (() => Appointment, (appointment) => appointment.user)
        appointment: Appointment[]
    
}



