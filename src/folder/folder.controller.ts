import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../user/current-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Folder } from './folder.entity';
import { File } from './file.entity';
import { Roles } from '../auth/roles.decorator';
import { FolderService } from './folder.service';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { CreateFolderDTO } from './dto/create-folder.dto';
import { CreateFileDTO } from './dto/create-file.dto';
import { SyncFileDTO } from './dto/sync-file.dto';

@ApiTags('folder', 'file')
@Controller('folder')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FolderController {

    constructor(private folderService: FolderService) {}

    @Get()
    @Roles("LIST_FOLDERS")
    @ApiOperation({ summary: "List folders" })
    public async listFolders(
        @CurrentUser() user: JwtPayload
    ): Promise<Folder[]> {
        return await this.folderService.findAll(user);
    }

    @Get(":folderUuid")
    @Roles("GET_FOLDER")
    @ApiOperation({ summary: "Find folder" })
    public async getFolder(
        @CurrentUser() user: JwtPayload, 
        @Param('folderUuid', new ParseUUIDPipe()) folderUuid: string
    ): Promise<Folder> {
        return await this.folderService.findOne(user, folderUuid);
    }

    @Post()
    @Roles("CREATE_FOLDER")
    @ApiOperation({ summary: "Create folder" })
    public async createFolder(
        @CurrentUser() user: JwtPayload, 
        @Body(new ValidationPipe()) createFolderDTO: CreateFolderDTO
    ): Promise<Folder> {
        return await this.folderService.create(user, createFolderDTO);
    }

    @Delete(":folderUuid")
    @Roles("DELETE_FOLDER")
    @ApiOperation({ summary: "Delete folder" })
    public async deleteFolder(
        @CurrentUser() user: JwtPayload, 
        @Param('folderUuid', new ParseUUIDPipe()) folderUuid: string
    ): Promise<Folder> {
        return await this.folderService.delete(user, folderUuid);
    }

    @Post(":folderUuid/file")
    @Roles("CREATE_FILE")
    @ApiOperation({ summary: "Create file in folder" })
    public async createFile(
        @CurrentUser() user: JwtPayload, 
        @Param('folderUuid', new ParseUUIDPipe()) folderUuid: string,
        @Body(new ValidationPipe()) createFileDTO: CreateFileDTO
    ): Promise<File> {
        return await this.folderService.createFile(user, folderUuid, createFileDTO);
    }

    @Get(":folderUuid/file")
    @Roles("LIST_FILE")
    @ApiOperation({ summary: "List file in folder" })
    public async listFiles(
        @CurrentUser() user: JwtPayload,
        @Param('folderUuid', new ParseUUIDPipe()) folderUuid: string,
    ): Promise<Folder> {
        return await this.folderService.listFiles(user, folderUuid);
    }

    @Get(":folderUuid/file/:fileUuid")
    @Roles("GET_FILE")
    @ApiOperation({ summary: "Find file in folder" })
    public async getFile(
        @CurrentUser() user: JwtPayload,
        @Param('folderUuid', new ParseUUIDPipe()) folderUuid: string,
        @Param('fileUuid', new ParseUUIDPipe()) fileUuid: string,
    ): Promise<File> {
        return await this.folderService.findFile(user, folderUuid, fileUuid)
    }

    @Patch(":folderUuid/file/:fileUuid/sync")
    @Roles("SYNC_FILE")
    @ApiOperation({ summary: "Synchronizes the file after saving to internal storage" })
    public async syncFile(
        @CurrentUser() user: JwtPayload, 
        @Param('folderUuid', new ParseUUIDPipe()) folderUuid: string,
        @Param('fileUuid', new ParseUUIDPipe()) fileUuid: string,
        @Body(new ValidationPipe()) syncFileDTO: SyncFileDTO
    ): Promise<File> {
        return await this.folderService.syncFile(user, folderUuid, fileUuid, syncFileDTO);
    }

}
