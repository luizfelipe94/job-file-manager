import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantRepository } from 'src/tenant/tenant.repository';
import { CreateUserDTO } from './dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(TenantRepository) private readonly tenantRepository: TenantRepository
    ) {}

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findOne(uuid: string): Promise<User> {
        return await this.userRepository.findOne(uuid);
    }

    public async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findByEmail(email);
    }

    public async create(createUserDTO: CreateUserDTO): Promise<User> {

        const qb = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: createUserDTO.email });

        const user = await qb.getOne();
        if(user){
            throw new UnprocessableEntityException(`User already exists in database with email ${createUserDTO.email}`);
        }

        const tenant = await this.tenantRepository.findOne(createUserDTO.tenantUuid);
        if(!tenant){
            throw new NotFoundException(`Not found contract for uuid ${createUserDTO.tenantUuid}`);
        }

        const newUser = new User();
        newUser.name = createUserDTO.name;
        newUser.email = createUserDTO.email;
        newUser.password = createUserDTO.password;
        newUser.tenant = tenant;

        return await this.userRepository.save(newUser);
    
    }
    
}
