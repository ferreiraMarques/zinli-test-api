import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';
import { DeleteVehicleDto } from 'src/vehicle/dto/delete-vehicle.dto';
import { UpdateVehicleDto } from 'src/vehicle/dto/update-vehicle.dto';
import { Repository } from 'typeorm';
import { ValidateAvailabilityService } from '../validate-availability/validate-availability.service';

@Injectable()
export class VehicleService {

    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
        private validateAvailabilityService: ValidateAvailabilityService,
    ) {

    }

    public list(quantity: number, offset: number) {
        return this.vehicleRepository.find({ take: quantity, skip: offset })
    }

    public async create(dto: CreateVehicleDto) {
        let existsVehicle = await this.validateAvailabilityService
            .validAvailabilityVehicle(dto.plate, dto.rentalFrom, dto.rentalFrom)

        if (existsVehicle.length > 0) {
            throw new BadRequestException("The vehicle is already rented")
        }        
        return await this.vehicleRepository.save(dto)
    }

    public async update(dto: UpdateVehicleDto, id: number) {

        let vehicle = await this.vehicleRepository.findOne(id)

        if (vehicle === undefined) {
            throw new NotFoundException("The vehicle no register")
        }

        let newVehicle = new Vehicle(
            dto.client,
            dto.phone,
            dto.plate,
            dto.rentalFrom,
            dto.rentTo
        );

        newVehicle = this.validateAvailabilityService.changeStatusVehicle(newVehicle, vehicle, dto.status);
        newVehicle.updatedAt = new Date()
        return (await this.vehicleRepository.update(id, newVehicle)).affected > 0;

    }

    public delete(dto: DeleteVehicleDto) {
        return this.vehicleRepository.delete(dto.ids)
    }
}
