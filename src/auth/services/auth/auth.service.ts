import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import { PayloadJwt } from "../../jwt/payload-jwt";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    public async login(login: LoginDto) {
        const user = await this.usersService.findByEmail(login.email)
        
        if (!user) {
            throw new BadRequestException("incorrect credentials")
        }

        if (!await user.validatePassword(login.password)) {
            throw new BadRequestException("incorrect credentials")
        }

        if(!user.verify) {
            throw new BadRequestException("Your account has not been verified")
        }

        return this.generateJwtToken(login.email);
    }

    private async generateJwtToken(email: string) {
        const user = await this.usersService.findByEmail(email);
        const payload: PayloadJwt = { id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
