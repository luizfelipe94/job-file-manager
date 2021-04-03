import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SyncFileDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'path cannot be empty' })
    path: string;

    @ApiProperty()
    sync: boolean;

}