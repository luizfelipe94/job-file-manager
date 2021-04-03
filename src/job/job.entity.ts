import { File } from "../folder/file.entity";
import { JobCheckpoint } from "./job-checkpoint.entity";
import { JobResult } from "./job-result.entity";
import { JobStatusLog } from "./job-status-log.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { JobStatus } from "./job-status.enum";
import { User } from "../user/user.entity";

@Entity("job")
export class Job extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "date", nullable: true })
    startDate: Date;

    @Column({ type: "date", nullable: true })
    endDate: Date;

    @Column({ type: "enum", enum: JobStatus })
    status: JobStatus;

    @Column({ type: "jsonb" })
    config: object;

    @ManyToOne(type => File, file => file.jobs)
    file: File;

    @ManyToOne(type => User, user => user.jobs)
    user: User;

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