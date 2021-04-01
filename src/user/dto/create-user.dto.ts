import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateUserDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'name cannot be empty' })
    readonly name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({ message: 'email cannot be empty' })
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8, 30, { message: 'password must be 8 to 20 characters long' })
    password: string;

    @ApiProperty()
    @IsUUID('all', { message: 'invalid tenantUuid' })
    @IsNotEmpty({ message: 'tenantUuid cannot be empty' })
    readonly tenantUuid: string;

}