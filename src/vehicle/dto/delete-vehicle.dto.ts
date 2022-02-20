import { ArrayMinSize, IsArray } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class DeleteVehicleDto {

    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1, { message: "Ids: el campo tiene un minimo de elementos es de (1)" })
    ids: number[]
}