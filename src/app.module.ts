import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { FolderModule } from './folder/folder.module';
import { JobModule } from './job/job.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import * as TypeormConfig from "./typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeormConfig),
    TenantModule, RoleModule, UserModule, FolderModule, JobModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
