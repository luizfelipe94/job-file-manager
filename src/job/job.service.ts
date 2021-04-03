import { Injectable, NotFoundException, NotImplementedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { CreateJobDTO } from './dto/create-job.dto';
import { JobCheckpoint } from './job-checkpoint.entity';
import { JobResult } from './job-result.entity';
import { JobStatusLog } from './job-status-log.entity';
import { Job } from './job.entity';
import { File } from '../folder/file.entity';
import { JobRepository } from './job.repository';
import { FolderService } from '../folder/folder.service';
import { UserService } from 'src/user/user.service';
import { JobStatus } from './job-status.enum';
import { CreateJobCheckpointDTO } from './dto/create-job-checkpoint.dto';

@Injectable()
export class JobService {

    constructor(
        @InjectRepository(JobRepository) private readonly jobRepository: JobRepository,
        @InjectRepository(JobStatusLog) private readonly jobStatusLogRepository: Repository<JobStatusLog>,
        @InjectRepository(JobCheckpoint) private readonly jobCheckpointRepository: Repository<JobCheckpoint>,
        @InjectRepository(File) private readonly fileRepository: Repository<File>,
        private readonly folderService: FolderService,
        private readonly userService: UserService
    ) {}

    public async listJobs(user: JwtPayload): Promise<Job[]> {
        return await this.jobRepository.find({
            where: {
                user: user.uuid
            }
        });
    }

    public async getJob(user: JwtPayload, jobUuid: string, relations?: string[]): Promise<Job> {
        const job = await this.jobRepository.findOne({
            where: {
                user: user.uuid,
                uuid: jobUuid
            },
            relations: relations
        });

        if(!job) throw new NotFoundException(`Not found job for uuid ${jobUuid}`);

        return job;
    }

    public async createJob(user: JwtPayload, createJobDTO: CreateJobDTO): Promise<Job> {

        const file = await this.folderService.findFile(user, createJobDTO.folderUuid, createJobDTO.fileUuid);

        if(!file) throw new NotFoundException(`File not found for uuid ${createJobDTO.fileUuid}`);

        const jobUser = await this.userService.findOne(user);

        const job = new Job();
        job.file = file;
        job.user = jobUser;
        job.config = createJobDTO.config;
        job.status = JobStatus.CREATED;

        const jobResult = await this.jobRepository.save(job)
        .then(async (job) => {

            const jobStatusLog = new JobStatusLog();
            jobStatusLog.job = job;
            jobStatusLog.message = `created`;

            await this.jobStatusLogRepository.save(jobStatusLog);

            return job;
        });        
        
        return await this.jobRepository.findOne(jobResult.uuid);

    }

    public async startJob(user: JwtPayload, jobUuid: string): Promise<Job> {

        const job = await this.getJob(user, jobUuid);

        if(!job) throw new NotFoundException(`Not found job for uuid ${jobUuid}`);

        if(job.status != JobStatus.CREATED) throw new UnprocessableEntityException(`Job ${job.uuid} cant be initialized. status ${job.status}`);

        job.status = JobStatus.INITIALIZAED;
        job.startDate = new Date();

        const jobResult = await this.jobRepository.save(job)
        .then(async (res) => {

            const jobStatusLog = new JobStatusLog();
            jobStatusLog.job = res;
            jobStatusLog.message = `status updeted from ${job.status} to ${res.status}`;
            await this.jobStatusLogRepository.save(jobStatusLog);
            return res;

        });
        return await this.jobRepository.findOne(jobResult.uuid);
    }

    public async finishJob(user: JwtPayload, jobUuid: string, jobstatus?: JobStatus): Promise<Job> {

        const job = await this.getJob(user, jobUuid);

        if(!job) throw new NotFoundException(`Not found job for uuid ${jobUuid}`);

        if(job.status != JobStatus.INITIALIZAED) throw new UnprocessableEntityException(`Job ${job.uuid} cant be finished. status ${job.status}`);

        job.status = JobStatus.SUCCESS;
        job.endDate = new Date();

        const jobResult = await this.jobRepository.save(job)
        .then(async (res) => {

            const jobStatusLog = new JobStatusLog();
            jobStatusLog.job = res;
            jobStatusLog.message = `status updeted from ${job.status} to ${res.status}`;
            await this.jobStatusLogRepository.save(jobStatusLog);
            return res;

        });

        return await this.jobRepository.findOne(jobResult.uuid);
    }

    // JOBSTATUSLOG

    // public async listJobStatusLogs(user: JwtPayload): Promise<JobStatusLog[]>{
    //     throw new NotImplementedException("Not implemented yet");
    // }

    // public async getJobStatusLog(user: JwtPayload): Promise<JobStatusLog>{
    //     throw new NotImplementedException("Not implemented yet");
    // }
 
    // public async createJobStatusLog(user: JwtPayload): Promise<JobStatusLog> {
    //     throw new NotImplementedException("Not implemented yet");
    // }

    // JOBCHECKPOINT

    public async listJobCheckpoints(user: JwtPayload, jobUuid: string): Promise<JobCheckpoint[]> {

        const job = await this.getJob(user, jobUuid, ["jobCheckpoints"]);
        return job.jobCheckpoints;

    }

    public async createJobCheckpoint(user: JwtPayload, jobUuid: string, createJobcheckpointDTO: CreateJobCheckpointDTO): Promise<JobCheckpoint> {

        const job = await this.getJob(user, jobUuid);

        const jobCheckpoint = new JobCheckpoint();
        jobCheckpoint.status = createJobcheckpointDTO.status;
        jobCheckpoint.batchId = createJobcheckpointDTO.batchId;
        jobCheckpoint.message = createJobcheckpointDTO.message;
        jobCheckpoint.job = job;

        return await this.jobCheckpointRepository.save(jobCheckpoint);

    }

    // JOB RESULT

    public async listJobResults(user: JwtPayload): Promise<JobResult[]> {
        throw new NotImplementedException("Not implemented yet");
    }

    public async getJobResult(user: JwtPayload): Promise<JobResult> {
        throw new NotImplementedException("Not implemented yet");
    }

    public async createJobResult(user: JwtPayload): Promise<JobResult> {
        throw new NotImplementedException("Not implemented yet");
    }


}
