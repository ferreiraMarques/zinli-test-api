import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/role.decorator';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { DeleteVehicleDto } from './dto/delete-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleService } from './services/vehicle/vehicle.service';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';


@ApiTags('vehicle')
@ApiBearerAuth()
@Controller('vehicle')
export class VehicleController {

    constructor(private vehicleService: VehicleService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000')
    public async list(@Query("quantity") quantity: number = 10, @Query("offset") offset: number = 0) {
        return await this.vehicleService.list(quantity, offset)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000')
    public async create(@Body() dto: CreateVehicleDto) {
        return await this.vehicleService.create(dto)
    }

    @Patch("/:id")
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000')
    @ApiParam({ type: "number", required: true, name: "id" })
    public async update(@Body() dto: UpdateVehicleDto, @Param("id") id: number) {
        return await this.vehicleService.update(dto, id)
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000')
    public async delete(@Body() dto: DeleteVehicleDto) {
        return await this.vehicleService.delete(dto)
    }

}
