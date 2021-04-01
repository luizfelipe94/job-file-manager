import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor() {}

    @Get("whoami")
    public async testAuth(@Req() req: Request): Promise<any> {
        return req.user;
    }

}
