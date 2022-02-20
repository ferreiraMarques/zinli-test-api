import { Body, Controller, Get, Param, Patch, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/role.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './services/user/user.service';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000')
    public async list(@Query("quantity") quantity: number = 10, @Query("offset") offset: number = 0) {
        return await this.userService.list(quantity, offset);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000')
    public async create(@Body() dto: CreateUserDto) {
        return await this.userService.create(dto);
    }

    @Patch("/:id")
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000')
    @ApiParam({ type: "number", required: true, name: "id" })
    public async update(@Body() dto: UpdateUserDto, @Param() id: number) {
        return await this.userService.update(dto, id);
    }

    @Get('/verify')
    public async verify(@Query("identity") id: string) {
        return await this.userService.verify(id);
    }

    @Get("/:id")
    @UseGuards(AuthGuard('jwt'))
    @Roles('1000', '2000')
    @ApiParam({ type: "number", required: true, name: "id" })
    public async findById(@Param("id") id: number) {
        return await this.userService.findById(id);
    }

}
