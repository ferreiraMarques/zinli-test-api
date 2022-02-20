import { IsDateString, IsEnum, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator"
import { EditStatus } from "src/enum/edit-status.enum"
import { ApiProperty } from '@nestjs/swagger';


export class UpdateVehicleDto {

    @ApiProperty()
    @MinLength(3, { message: "Cliente: el campo tiene un minimo de (3) caracteres" })
    @MaxLength(250, { message: "Cliente: el campo tiene un maximo de (250) caracteres" })
    @IsNotEmpty({ message: "Cliente: el campo es requirido" })
    client: string

    @ApiProperty()
    @MinLength(8, { message: "Telefono: el campo tiene un minimo de (8) caracteres" })
    @MaxLength(14, { message: "Telefono: el campo tiene un maximo de (14) caracteres" })
    @IsNotEmpty({ message: "Telefono: el campo es requirido" })
    @IsPhoneNumber("PA", { message: "Telefono: El numero telefonico ingresado no posee un formato valido" })
    phone: string

    @ApiProperty()
    @MinLength(4, { message: "Placa de Vehiculo: el campo tiene un minimo de (4) caracteres" })
    @MaxLength(8, { message: "Placa de Vehiculo: el campo tiene un maximo de (8) caracteres" })
    @IsNotEmpty({ message: "Placa de Vehiculo: el campo es requirido" })
    plate: string

    @ApiProperty()
    @IsNotEmpty({ message: "Fecha de Inicio de Alquiler: el campo es requirido" })
    @IsDateString({}, { message: "Fecha de Inicio de Alquiler: el campo debe ser de tipo fecha (YYYY-MM-DD)" })
    rentalFrom: Date

    @ApiProperty()
    @IsNotEmpty({ message: "Fecha de Final de Alquiler: el campo es requirido" })
    @IsDateString({}, { message: "Fecha de Final de Alquiler: el campo debe ser de tipo fecha (YYYY-MM-DD)" })
    rentTo: Date

    @ApiProperty({ enum: ['Cancelado', 'Retirado por cliente', 'Entregado']})
    @IsNotEmpty({ message: "Estatus: el campo es requirido" })
    @IsEnum(EditStatus, { message: "Estatus: el campo no corresponde a los valores permitidos" })
    status: EditStatus

}