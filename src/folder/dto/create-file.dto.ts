import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateFileDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'name cannot be empty' })
    @Length(4, 200, { message: 'folder must be 4 to 200 characters long' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'size cannot be empty' })
    size: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'qtyLines cannot be empty' })
    qtyLines: number;

    // @ApiProperty()
    // s3path: string;

    // @ApiProperty()
    // sync: boolean;

}