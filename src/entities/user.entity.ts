import { ERole } from "src/enum/role.enum";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as crypto from "crypto-js";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    lastname: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column({ type: 'date' })
    datebirth: Date

    @Column({ type: "enum", enum: ERole })
    role: ERole

    @Column({ type: 'boolean', default: false })
    verify: boolean

    constructor(
        id: number, email: string, name: string, lastname: string,
        address: string, datebirth: Date, role: ERole) {

        this.id = id;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.address = address;
        this.datebirth = datebirth;
        this.role = role;
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await crypto.AES
            .encrypt(this.password, process.env.KEY)
            .toString()
    }

    async validatePassword(password: string): Promise<boolean> {
        let descryptPassword = await crypto.AES
            .decrypt(this.password, process.env.KEY)
            .toString(crypto.enc.Utf8);
        return await descryptPassword.localeCompare(password) === 0;
    }

}