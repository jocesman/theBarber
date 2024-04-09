import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Credential {
    @PrimaryGeneratedColumn()
    credentialId: number

    @Column()
    username: string

    @Column()
    password: string
}
