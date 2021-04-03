import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsUUID, Length } from "class-validator";

export class CreateJobResultDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'result cannot be empty' })
    @IsObject()
    result: object;

}