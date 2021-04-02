export interface JwtPayload {
    uuid: string;
    tenantUuid: string;
    name: string;
    email: string;
    roles?: string[];
    createdAt: Date;
    updatedAt: Date;
}