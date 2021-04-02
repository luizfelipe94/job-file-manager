import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginStatus } from './interface/login-status.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public async login(login: LoginDTO): Promise<LoginStatus> {

        const user = await this.userService.findByEmail(login.email);

        if(!user){
            throw new UnauthorizedException('User not found');
        }

        const validPassword = await bcrypt.compare(login.password, user.password);

        if(!validPassword){
            throw new UnauthorizedException('User not found');
        }

        const token = await this.createToken(user);
        const expIn = this.configService.get<string>('JWT_EXPIRES_IN');

        const loginStatus: LoginStatus = {
            userUuid: user.uuid,
            name: user.name,
            accessToken: token,
            expiresIn: expIn
        };

        return loginStatus;
        
    }

    private createToken(user: User): Promise<String> {

        return new Promise((resolve) => {

            const payload: JwtPayload = { 
                uuid: user.uuid,
                tenantUuid: user.tenant.uuid,
                name: user.name,
                email: user.email, 
                createdAt: user.createdAt, 
                updatedAt: user.updatedAt,
                roles: user.roles.map(r => r.name)
            };

            resolve(this.jwtService.sign(payload));

        });

    }

}
