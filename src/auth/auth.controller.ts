import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginStatus } from './interface/login-status.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(@Body() loginDto: LoginDTO): Promise<LoginStatus> {
        return this.authService.login(loginDto);
    }

    @Get("whoami")
    @UseGuards(JwtAuthGuard)
    public async testAuth(@Req() req: Request): Promise<any> {
        return req.user;
    }

}
