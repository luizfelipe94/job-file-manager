import { EntityRepository, Repository } from "typeorm";
import { Tenant } from "./tenant.entity";

@EntityRepository(Tenant)
export class TenantRepository extends Repository<Tenant> { }