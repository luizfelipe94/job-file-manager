import { Job } from "../job/job.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { JobCheckpointStatus } from "./job-checkpoint-status.enum";

@Entity("job_checkpoint")
export class JobCheckpoint extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "int", default: 0, nullable: false })
    batchId: number;
    
    @Column({ type: "varchar", length: 2000, nullable: false })
    message: string;

    @Column({ type: "enum", enum: JobCheckpointStatus })
    status: JobCheckpointStatus

    @ManyToOne(type => Job, job => job.jobCheckpoints)
    job: Job;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @VersionColumn()
    version: number;

}