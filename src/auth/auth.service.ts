import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginStatus } from './interface/login-status.interface';

@Injectable()
export class AuthService {

    constructor(
        // private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public async login(login: LoginDTO): Promise<LoginStatus> {

        // const user = await this.userService.findUserRolesByEmail(login.email);

        // if(!user){
        //     throw new UnauthorizedException('User not found');
        // }

        // const validPassword = await bcrypt.compare(login.password, user.password);

        // if(!validPassword){

        //     throw new UnauthorizedException('User not found');

        // }

        // const roles = user.userGroups.map((ug: any) => ug.group.groupRoles.map((gr: any) => gr.role.name ))[0];
        // const token = this.createToken(user, roles);
        // const expIn = this.configService.get<string>('JWT_EXPIRES_IN');

        // const loginStatus: LoginStatus = {
        //     userUuid: user.uuid,
        //     name: user.name,
        //     accessToken: token,
        //     expiresIn: expIn

        // };

        // return loginStatus;

        return null;
        
    }

    private createToken(user: User, roles: string[]): string {
        
        const payload: JwtPayload = { 
            uuid: user.uuid,
            name: user.name, 
            email: user.email, 
            createdAt: user.createdAt, 
            updatedAt: user.updatedAt,
            roles
        };

        return this.jwtService.sign(payload);

    }

}
