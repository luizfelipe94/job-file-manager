import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateFolderDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'name cannot be empty' })
    @Length(4, 100, { message: 'folder must be 4 to 100 characters long' })
    name: string;

    @ApiProperty()
    description: string;

    // @ApiProperty()
    // @IsNotEmpty({ message: 'userUuid cannot be empty' })
    // @IsUUID('all', { message: 'invalid tenantUuid' })
    // userUuid: string;

}