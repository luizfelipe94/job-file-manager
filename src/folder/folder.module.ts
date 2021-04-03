import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderRepository } from './folder.repository';
import { UserRepository } from '../user/user.repository';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FolderRepository, UserRepository, File])],
  providers: [FolderService],
  controllers: [FolderController],
  exports: [FolderService]
})
export class FolderModule {}
