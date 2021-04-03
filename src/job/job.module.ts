import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';
import { File } from '../folder/file.entity';
import { FolderModule } from '../folder/folder.module';
import { FolderRepository } from '../folder/folder.repository';
import { UserModule } from '../user/user.module';
import { JobStatusLog } from './job-status-log.entity';
import { JobCheckpoint } from './job-checkpoint.entity';
import { JobResult } from './job-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository, FolderRepository, File, JobStatusLog, JobCheckpoint, JobResult]), FolderModule, UserModule],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
