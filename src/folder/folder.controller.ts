import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../user/current-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Folder } from './folder.entity';
import { File } from '../file/file.entity';
import { Roles } from '../auth/roles.decorator';
import { FolderService } from './folder.service';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { CreateFolderDTO } from './dto/create-folder.dto';
import { CreateFileDTO } from './dto/create-file.dto';

@ApiTags('folder')
@Controller('folder')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FolderController {

    constructor(private folderService: FolderService) {}

    @Get()
    @Roles("LIST_FOLDERS")
    @ApiOperation({ summary: "List folders" })
    public async listFolders(@CurrentUser() user: JwtPayload): Promise<Folder[]> {
        return await this.folderService.findAll(user);
    }

    @Get(":folderUuid")
    @Roles("GET_FOLDER")
    @ApiOperation({ summary: "Find folder" })
    public async getFolder(@CurrentUser() user: JwtPayload, @Param('folderUuid') folderUuid: string): Promise<Folder> {
        return await this.folderService.findOne(user, folderUuid);
    }

    @Post()
    @Roles("CREATE_FOLDER")
    @ApiOperation({ summary: "Create folder" })
    public async createFolder(@CurrentUser() user: JwtPayload, @Body(new ValidationPipe()) createFolderDTO: CreateFolderDTO): Promise<Folder> {
        return await this.folderService.create(user, createFolderDTO);
    }

    @Delete(":folderUuid")
    @Roles("DELETE_FOLDER")
    @ApiOperation({ summary: "Delete folder" })
    public async deleteFolder(@CurrentUser() user: JwtPayload, @Param('folderUuid') folderUuid: string): Promise<Folder> {
        return await this.folderService.delete(user, folderUuid);
    }

    @Post(":folderUuid/file")
    @Roles("CREATE_FILE")
    @ApiOperation({ summary: "Create file in folder" })
    public async createFile(
        @CurrentUser() user: JwtPayload, 
        @Param('folderUuid') folderUuid: string,
        @Body(new ValidationPipe()) createFileDTO: CreateFileDTO
    ): Promise<File> {
        return await this.folderService.createFile(user, folderUuid, createFileDTO);
    }

    // @Delete(":folderUuid/file/:fileUuid")
    // @Roles("DELETE_FILE")
    // @ApiOperation({ summary: "Delete file" })
    // public async deleteFile(
    //     @CurrentUser() user: JwtPayload, 
    //     @Param('folderUuid') folderUuid: string, 
    //     @Param('fileUuid') fileUuid: string
    // ): Promise<void> {

    // }

    // @Patch("")
    // @ApiOperation({ summary: "Synchronizes the file after saving to internal storage" })
    // public async syncFile(@CurrentUser() user: JwtPayload, @Param('uuid') uuid): Promise<void> {

    // }

}
