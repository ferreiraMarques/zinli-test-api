import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SendgridService } from 'src/user/services/sendgrid/sendgrid.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Repository } from 'typeorm';
import * as crypto from "crypto-js";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private sendgridService: SendgridService,
    ) { }

    public async list(quantity: number, offset: number) {
        return this.usersRepository.find({
            take: quantity,
            skip: offset,
            select: [
                'id', 'email', 'datebirth', 'address',
                'name', 'lastname', 'phone', 'role', 'verify'
            ]
        });
    }

    public async create(dto: CreateUserDto) {
        let user: User;
        let id: string;

        try {
            if (await this.findByEmail(dto.email) != undefined) {
                throw new BadRequestException("the user has already been created ");
            }

            user = await this.usersRepository.save(dto)
            id = crypto.AES.encrypt(user.id.toString(), process.env.KEY).toString()

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }

        try {
            this.sendgridService.send({
                to: user.email,
                subject: 'Zinli test verify user',
                from: process.env.SEND_GRID_EMAIL,
                text: 'To verify your username click on the following link',
                html: `
                    <p>
                        To verify your username 
                        click on the following link ${process.env.RETURN_SERVER}/user/verify?identity=${id}
                    </p>
                `,
            })
        } catch (error) {
            console.log(error);
        }

        delete user.password
        return user
    }

    public async update(dto: UpdateUserDto, id: number) {
        return this.usersRepository.update({ id }, dto)
    }

    public async verify(id: string) {
        let idDecrypt = crypto.AES
            .decrypt(id, process.env.KEY)
            .toString(crypto.enc.Utf8)

        let user = await this.usersRepository.findOne(parseInt(idDecrypt))
        if (user) {
            await this.usersRepository.update({ id: parseInt(idDecrypt) }, { verify: true })
            return "User verified"
        } else {
            throw new BadRequestException("User not found");
        }
    }

    public async findByEmail(email: string) {
        return this.usersRepository.findOne({
            where: {
                email
            }
        })
    }

    public async findById(id: number) {
        return this.usersRepository.findOne(id)
    }

}
