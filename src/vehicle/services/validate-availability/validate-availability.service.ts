import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { EditStatus } from 'src/enum/edit-status.enum';
import { EStatus } from 'src/enum/status.enum';
import { Equal, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ValidateAvailabilityService {

    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
    ) { }

    public validAvailabilityVehicle(plate: string, rentalFrom: Date, rentTo: Date) {
        return this.vehicleRepository.find({
            where: {
                plate: Equal(plate),
                rentalFrom: MoreThanOrEqual(rentalFrom),
                rentTo: MoreThanOrEqual(rentTo)
            }
        })
    }

    public changeStatusVehicle(
        newVehicle: Vehicle,
        previusVehicle: Vehicle, newStatus: EditStatus): Vehicle {

        if (
            previusVehicle.status === EStatus.Cancelled ||
            previusVehicle.status === EStatus.Delivered) {

            throw new
                ConflictException(
                    `The vehicle is already in a state of ${previusVehicle.status}, cannot change this status`
                );
        }

        if (
            previusVehicle.status.toString() === EStatus.WithdrawnByCustomer &&
            newStatus === EditStatus.Delivered) {

            newVehicle.status = EStatus.Delivered

        } else if (newStatus === EditStatus.Delivered) {
            newVehicle.status = EStatus.Delivered
        }

        return newVehicle;
    }
}
