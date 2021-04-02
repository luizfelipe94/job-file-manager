import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { TenantRepository } from '../tenant/tenant.repository';
import { CreateUserDTO } from './dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(TenantRepository) private readonly tenantRepository: TenantRepository
    ) {}

    public async findAll(user: JwtPayload): Promise<User[]> {
        return await this.userRepository.findAll(user);
    }

    public async findOne(user: JwtPayload): Promise<User> {
        return await this.userRepository.findByUuid(user);
    }

    public async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findByEmail(email);
    }

    public async create(user: JwtPayload, createUserDTO: CreateUserDTO): Promise<User> {

        const qb = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: createUserDTO.email });

        const userExists = await qb.getOne();
        if(userExists){
            throw new UnprocessableEntityException(`User already exists in database with email ${createUserDTO.email}`);
        }

        const tenant = await this.tenantRepository.findOne(user.tenantUuid);
        if(!tenant){
            throw new NotFoundException(`Not found tenant for uuid ${user.tenantUuid}`);
        }

        const newUser = new User();
        newUser.name = createUserDTO.name;
        newUser.email = createUserDTO.email;
        newUser.password = createUserDTO.password;
        newUser.tenant = tenant;

        return await this.userRepository.save(newUser);
    
    }
    
}
