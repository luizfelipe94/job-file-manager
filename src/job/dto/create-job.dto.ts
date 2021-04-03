import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsUUID, Length } from "class-validator";

export class CreateJobDTO {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'fileUuid cannot be empty' })
    @IsUUID("4", { message: "file uuid must be uuid format" })
    fileUuid: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'folderUuid cannot be empty' })
    @IsUUID("4", { message: "folder uuid must be uuid format" })
    folderUuid: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'config cannot be empty' })
    @IsObject()
    config: object;

}