import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './services/vehicle/vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { ValidateAvailabilityService } from './services/validate-availability/validate-availability.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    UserModule
  ],
  controllers: [VehicleController],
  providers: [VehicleService, ValidateAvailabilityService],
  exports: [
    TypeOrmModule
  ]
})
export class VehicleModule {}
