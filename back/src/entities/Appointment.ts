import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentStatus } from "./AppointmentStatus";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    time: Date;

    @Column()
    userId: number;

    @Column({
        type: "enum",
        enum: AppointmentStatus,
        default: AppointmentStatus.Active
    })
    status: AppointmentStatus;
}


