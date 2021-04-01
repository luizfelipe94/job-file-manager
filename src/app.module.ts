import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { FolderModule } from './folder/folder.module';
import { FileModule } from './file/file.module';
import { JobModule } from './job/job.module';
import { JobResultModule } from './job-result/job-result.module';
import { JobStatusLogModule } from './job-status-log/job-status-log.module';
import { JobCheckpointModule } from './job-checkpoint/job-checkpoint.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import * as TypeormConfig from "./typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeormConfig),
    TenantModule, RoleModule, UserModule, FolderModule, FileModule, JobModule, JobResultModule, JobStatusLogModule, JobCheckpointModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
