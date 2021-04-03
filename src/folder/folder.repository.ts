import { EntityRepository, Repository } from "typeorm";
import { Folder } from "./folder.entity";

@EntityRepository(Folder)
export class FolderRepository extends Repository<Folder> {  }