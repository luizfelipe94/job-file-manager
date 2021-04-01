import { File } from "src/file/file.entity";
import { JobCheckpoint } from "src/job-checkpoint/job-checkpoint.entity";
import { JobResult } from "src/job-result/job-result.entity";
import { JobStatusLog } from "src/job-status-log/job-status-log.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { JobStatus } from "./job-status.enum";

@Entity("job")
export class Job extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "date" })
    startDate: Date;

    @Column({ type: "date" })
    endDate: Date;

    @Column({ type: "enum", enum: JobStatus })
    status: JobStatus;

    @Column({ type: "jsonb" })
    config: object;

    @ManyToOne(type => File, file => file.jobs)
    file: File;

    @OneToMany(type => JobStatusLog, jobStatusLog => jobStatusLog.job)
    jobStatusLogs: JobStatusLog[];

    @OneToMany(type => JobCheckpoint, jobCheckpoint => jobCheckpoint.job)
    jobCheckpoints: JobCheckpoint[];

    @OneToMany(type => JobResult, jobResult => jobResult.job)
    jobResults: JobResult[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @VersionColumn()
    version: number;

}