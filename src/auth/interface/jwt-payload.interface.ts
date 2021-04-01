export interface JwtPayload {
    uuid: string;
    name: string;
    email: string;
    roles?: string[];
    createdAt: Date;
    updatedAt: Date;
}