import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SendgridService } from 'src/user/services/sendgrid/sendgrid.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    
  ],
  controllers: [UserController],
  providers: [
    UserService,
    SendgridService
  ],
  exports: [
    TypeOrmModule,
    UserService
  ]
})
export class UserModule { }
