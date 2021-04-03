import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { UserRepository } from '../user/user.repository';
import { CreateFolderDTO } from './dto/create-folder.dto';
import { Folder } from './folder.entity';
import { File } from './file.entity';
import { FolderRepository } from './folder.repository';
import { CreateFileDTO } from './dto/create-file.dto';
import { SyncFileDTO } from './dto/sync-file.dto';

@Injectable()
export class FolderService {

    constructor(
        @InjectRepository(FolderRepository) private readonly folderRepository: FolderRepository,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(File) private readonly fileRepository: Repository<File>
    ) {}

    public async findAll(user: JwtPayload): Promise<Folder[]> {
        return await this.folderRepository.find({
            where: {
                user: user.uuid
            }
        });
    }

    public async findOne(user: JwtPayload, uuid: string): Promise<Folder> {
        return await this.folderRepository.findOne({
            where: {
                user: user.uuid,
                uuid
            }
        });
    }

    public async create(user: JwtPayload, createFolderDTO: CreateFolderDTO): Promise<Folder> {

        const userExists = await this.userRepository.findOne(user.uuid);

        if(!userExists){
            throw new NotFoundException(`Not found user for uuid ${user.uuid}`);
        }

        const folderExists = await this.folderRepository.findOne({ 
            where: {
                name: createFolderDTO.name,
                user: userExists.uuid
            }
        });

        if(folderExists){
            throw new UnprocessableEntityException(`Already exists folder with name ${createFolderDTO.name}`);
        }

        const newFolder: Folder = new Folder();
        newFolder.name = createFolderDTO.name;
        newFolder.description = createFolderDTO.description;
        newFolder.user = userExists;

        return await this.folderRepository.save(newFolder);

    }

    public async delete(user: JwtPayload, uuid: string): Promise<Folder> {

        const folder = await this.folderRepository.findOne({
            where: {
                user: user.uuid,
                uuid
            }
        });

        if(!folder){
            throw new NotFoundException(`Not found folder for uuid ${uuid}`);
        }

        return await this.folderRepository.remove(folder);
    }

    public async findFile(user: JwtPayload, folderUuid: string, fileUuid: string): Promise<File> {

        const folder = await this.folderRepository.findOne({
            where: {
                uuid: folderUuid,
                user: user.uuid
            }
        });

        if(!folder) throw new NotFoundException(`Not found folder for uuid ${folderUuid}`);

        return await this.fileRepository.findOne({
            where: {
                folder,
                uuid: fileUuid
            }
        });

    }

    public async listFiles(user: JwtPayload, folderUuid: string): Promise<Folder> {

        return await this.folderRepository.findOne({
            where: {
                user: user.uuid,
                uuid: folderUuid
            },
            relations: ["files"]
        });

    }

    public async createFile(user: JwtPayload, folderUuid: string, createFileDTO: CreateFileDTO): Promise<File> {

        const folder = await this.folderRepository.findOne({ where: { uuid: folderUuid } });

        if(!folder){
            throw new NotFoundException(`Not found folder for uuid ${folderUuid}`);
        }

        const file = new File();
        file.name = createFileDTO.name;
        file.size = createFileDTO.size;
        file.qtyLines = createFileDTO.qtyLines;
        file.folder = folder;

        return await this.fileRepository.save(file);

    }
    
    public async syncFile(user: JwtPayload, folderUuid: string, fileUuid: string, syncFileDTO: SyncFileDTO): Promise<File> {

        const folder = await this.folderRepository.findOne({ where: { user: user.uuid, uuid: folderUuid } });
        
        if(!folder) throw new NotFoundException(`Not found folder for uuid ${folderUuid}`);

        const fileToUpdate = await this.fileRepository.findOne({ 
            where: {
                uuid: fileUuid,
                folder: folderUuid
            }
        });

        if(!fileToUpdate) throw new NotFoundException(`Not found file for uuid ${fileUuid}`);

        fileToUpdate.path = syncFileDTO.path;
        fileToUpdate.sync = syncFileDTO.sync;

        return await this.fileRepository.save(fileToUpdate);

    }

}
