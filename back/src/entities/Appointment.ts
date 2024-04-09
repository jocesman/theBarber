import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentStatus } from "./AppointmentStatus";
import { User } from "./Users";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    appointmentId: number;

    @Column()
    date: Date;

    @Column()
    time: Date;

    @Column({
        type: "enum",
        enum: AppointmentStatus,
        default: AppointmentStatus.Active
    })
    status: AppointmentStatus;

    @ManyToOne (() => User, (user) => user.appointment)
        user: User;

}


