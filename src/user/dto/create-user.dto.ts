import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator"
import { ERole } from "src/enum/role.enum"
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty()
    @MinLength(3, { message: "Email: el campo tiene un minimo de (3) caracteres" })
    @MaxLength(150, { message: "Email: el campo tiene un maximo de (150) caracteres" })
    @IsEmail({ message: "Email: el campo debe ser de tipo correo electronico" })
    @IsNotEmpty({ message: "Email: el campo es requirido" })
    email: string

    @ApiProperty()
    @MinLength(3, { message: "Password: el campo tiene un minimo de (3) caracteres" })
    @MaxLength(100, { message: "Password: el campo tiene un maximo de (100) caracteres" })
    @IsNotEmpty({ message: "Password: el campo es requirido" })
    password: string

    @ApiProperty()
    @MinLength(3, { message: "Nombre: el campo tiene un minimo de (3) caracteres" })
    @MaxLength(100, { message: "Nombre: el campo tiene un maximo de (100) caracteres" })
    @IsNotEmpty({ message: "Nombre: el campo es requirido" })
    name: string

    @ApiProperty()
    @MinLength(3, { message: "Apellido: el campo tiene un minimo de (3) caracteres" })
    @MaxLength(100, { message: "Apellido: el campo tiene un maximo de (100) caracteres" })
    @IsNotEmpty({ message: "Apellido: el campo es requirido" })
    lastname: string

    @ApiProperty()
    @MinLength(9, { message: "Telefono: el campo tiene un minimo de (8) caracteres" })
    @MaxLength(14, { message: "Telefono: el campo tiene un maximo de (14) caracteres" })
    @IsNotEmpty({ message: "Telefono: el campo es requirido" })
    @IsPhoneNumber("PA", { message: "Telefono: El numero telefonico ingresado no posee un formato valido" })
    phone: string

    @ApiProperty()
    @MinLength(3, { message: "Direccion: el campo tiene un minimo de (3) caracteres" })
    @MaxLength(250, { message: "Direccion: el campo tiene un maximo de (250) caracteres" })
    @IsNotEmpty({ message: "Direccion: el campo es requirido" })
    address: string

    @ApiProperty()
    @IsNotEmpty({ message: "Fecha de Nacimiento: el campo es requirido" })
    @IsDateString({}, { message: "Fecha de Nacimiento: el campo debe ser de tipo fecha (YYYY-MM-DD)" })
    datebirth: Date

    @ApiProperty({ enum: [1000, 2000] })
    @IsNotEmpty({ message: "Role: el campo es requirido" })
    @IsEnum(ERole, { message: "Role: el campo debe ser de tipo (1000) o (2000)" })
    role: ERole
}