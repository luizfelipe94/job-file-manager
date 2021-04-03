import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginStatus } from './interface/login-status.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: "Generate auth token" })
    public async login(@Body(new ValidationPipe()) loginDto: LoginDTO): Promise<LoginStatus> {
        return this.authService.login(loginDto);
    }

    @Get("whoami")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Show logged user" })
    public async testAuth(@Req() req: Request): Promise<any> {
        return req.user;
    }

}
