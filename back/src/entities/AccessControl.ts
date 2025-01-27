import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "accesscontrol"
})
export class AccessControl {
    @PrimaryColumn()
    accessUserPhone: string // Cambiado a string para manejar formatos de teléfono

    @Column({
        length: 255
    })
    accessUserPassword: string; // Cambiado a string para manejar passwords
    
    @Column({
        default: new Date()
    })
    accessLastVisit: Date; // Mantiene Date para timestamps
};