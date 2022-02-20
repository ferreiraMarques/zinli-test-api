import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

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

}