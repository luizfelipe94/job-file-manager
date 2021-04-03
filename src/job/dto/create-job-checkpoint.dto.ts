import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsUUID, Length } from "class-validator";
import { JobCheckpointStatus } from "../job-checkpoint-status.enum";

export class CreateJobCheckpointDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'config cannot be empty' })
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'message cannot be empty' })
    message: string;

    @ApiProperty()
    @IsEnum(JobCheckpointStatus)
    status: JobCheckpointStatus;
    
}