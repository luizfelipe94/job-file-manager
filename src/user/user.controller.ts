import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDTO } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CurrentUser } from './current-user.decorator';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    @Roles('USER_LIST')
    public async list(@CurrentUser() user: JwtPayload): Promise<User[]> {
        return await this.userService.findAll(user);
    }

    @Post()
    @Roles('USER_CREATE')
    public async create(@CurrentUser() user: JwtPayload, @Body(new ValidationPipe()) createUserDTO: CreateUserDTO): Promise<User> {
        return await this.userService.create(user, createUserDTO);
    }

}
