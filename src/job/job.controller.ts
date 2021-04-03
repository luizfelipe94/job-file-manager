import { BadRequestException, Body, Controller, Get, NotImplementedException, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../user/current-user.decorator';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { JobCheckpoint } from './job-checkpoint.entity';
import { JobResult } from './job-result.entity';
import { JobStatusLog } from './job-status-log.entity';
import { Job } from './job.entity';
import { Roles } from '../auth/roles.decorator';
import { JobService } from './job.service';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateJobDTO } from './dto/create-job.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CreateJobCheckpointDTO } from './dto/create-job-checkpoint.dto';
import { JobFinishStatus } from './job-status.enum';
import { CreateJobResultDTO } from './dto/create-job-result.dto';

@ApiTags('job')
@Controller('job')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobController {

    constructor(
        private jobService: JobService
    ) {}

    @Get()
    // @Roles("LIST_JOBS")
    @ApiOperation({ summary: "list jobs" })
    public async listJobs(
        @CurrentUser() user: JwtPayload
    ): Promise<Job[]> {
        return await this.jobService.listJobs(user);
    }

    @Get(":jobUuid")
    // @Roles("GET_JOB")
    @ApiOperation({ summary: "Find job" })
    public async getJob(
        @CurrentUser() user: JwtPayload,
        @Param('jobUuid', new ParseUUIDPipe()) jobUuid: string
    ): Promise<Job> {
        return await this.jobService.getJob(user, jobUuid);
    }

    @Post()
    // @Roles("JOB_MANAGER")
    @ApiOperation({ summary: "Create job" })
    public async createJob(
        @CurrentUser() user: JwtPayload,
        @Body(new ValidationPipe()) createJobDTO: CreateJobDTO
    ): Promise<Job> {
        return await this.jobService.createJob(user, createJobDTO);
    }

    @Put(":jobUuid/start")
    @ApiOperation({ summary: "Start job" })
    public async startJob(
        @CurrentUser() user: JwtPayload,
        @Param('jobUuid', new ParseUUIDPipe()) jobUuid: string
    ): Promise<Job> {
        return await this.jobService.startJob(user, jobUuid);
    }

    @Put(":jobUuid/finish")
    @ApiOperation({ summary: "Finish job" })
    public async finishJob(
        @CurrentUser() user: JwtPayload,
        @Param('jobUuid', new ParseUUIDPipe()) jobUuid: string,
        @Query("status") finishStatus: string
    ): Promise<Job> {
        const status = JobFinishStatus[finishStatus];
        if(!status) throw new BadRequestException(`Invalid status '${status}'`);
        return await this.jobService.finishJob(user, jobUuid, status);
    }

    // restart
    // todo

    // JOBCHECKPOINT

    @Get(":jobUuid/jobcheckpoint")
    // @Roles("LIST_JOBCHECKPOINT", "JOB_MANAGER")
    @ApiOperation({ summary: "List job checkpoint" })
    public async listJobCheckpoints(
        @CurrentUser() user: JwtPayload,
        @Param('jobUuid', new ParseUUIDPipe()) jobUuid: string
    ): Promise<Job> {
        return await this.jobService.listJobCheckpoints(user, jobUuid);
    }

    @Post(":jobUuid/jobcheckpoint")
    // @Roles("JOB_MANAGER")
    @ApiOperation({ summary: "Create job checkpoint" })
    public async createJobCheckpoint(
        @CurrentUser() user: JwtPayload,
        @Param('jobUuid', new ParseUUIDPipe()) jobUuid: string,
        @Body(new ValidationPipe()) createJobCheckpointDTO: CreateJobCheckpointDTO
    ): Promise<JobCheckpoint> {
        return await this.jobService.createJobCheckpoint(user, jobUuid, createJobCheckpointDTO);
    }

    // JOB RESULT

    @Get(":jobUuid/jobresult")
    @Roles("LIST_JOBRESULT", "JOB_MANAGER")
    @ApiOperation({ summary: "List job result" })
    public async listJobResults(
        @CurrentUser() user: JwtPayload,
        @Param('jobUuid', new ParseUUIDPipe()) jobUuid: string
    ): Promise<Job> {
        return await this.jobService.listJobResults(user, jobUuid);
    }

    @Post(":jobUuid/jobcheckpoint")
    @Roles("JOB_MANAGER")
    @ApiOperation({ summary: "Create job result" })
    public async createJobResult(
        @CurrentUser() user: JwtPayload,
        @Param('jobUuid', new ParseUUIDPipe()) jobUuid: string,
        @Body(new ValidationPipe()) createJobResultDTO: CreateJobResultDTO
    ): Promise<JobResult> {
        return await this.jobService.createJobResult(user, jobUuid, createJobResultDTO);
    }

}
