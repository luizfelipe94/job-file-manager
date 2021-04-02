import { Role } from "../role/role.entity";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { JwtPayload } from "../auth/interface/jwt-payload.interface";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async findAll(user: JwtPayload): Promise<User[]> {
        return await this.find({
            where: {
                tenant: user.tenantUuid
            }
        });
    }

    public async findByUuid(user: JwtPayload): Promise<User> {
        return await this.findOne({
            where: {
                tenant: user.tenantUuid,
                uuid: user.uuid
            },
            relations: ["roles", "tenant"]
        });
    }

    public async findByEmail(email: string): Promise<User> {
        return await this.findOne({
            where: { email },
            relations: ["roles", "tenant"]
        });
    }
    
}