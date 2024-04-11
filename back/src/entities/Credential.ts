import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./Users"


@Entity()
export class Credential {
    @PrimaryGeneratedColumn()
    credentialId: number

    @Column()
    username: string

    @Column()
    password: string

    @Column({
        default: true
    })
    active: boolean

    @CreateDateColumn({ name: 'created_at' }) // Decorador CreateDateColumn
    createdAt: Date; // Esta propiedad almacenará la fecha y hora de creación del usuario

    @UpdateDateColumn({ name: 'updated_at' }) // Decorador UpdateDateColumn
    updatedAt: Date; // Esta propiedad almacenará la fecha y hora de la última actualización del usuario

    @OneToOne (() => User, (user) => user.credential)
    @JoinColumn()
        user: User
}
