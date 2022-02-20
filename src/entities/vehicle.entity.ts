import { EStatus } from "src/enum/status.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    client: string

    @Column()
    phone: string

    @Column()
    plate: string

    @Column({ type: 'date' })
    rentalFrom: Date

    @Column({ type: 'date' })
    rentTo: Date

    @Column({ type: "enum", enum: EStatus, default: EStatus.Reserved })
    status: EStatus

    @CreateDateColumn()
    createdAt: Date

    @Column({ type: 'date', nullable: true })
    updatedAt: Date

    @ManyToOne(() => User, user => user.id)
    user: User

    constructor(
        client: string,
        phone: string,
        plate: string,
        rentalFrom: Date,
        rentalTo: Date) {

        this.client = client
        this.plate = plate
        this.phone = phone
        this.rentalFrom = rentalFrom
        this.rentTo = rentalTo
    }

}