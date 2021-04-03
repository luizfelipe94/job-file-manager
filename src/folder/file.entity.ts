import { Folder } from "./folder.entity";
import { Job } from "../job/job.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity("file")
export class File extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "varchar", length: 256, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 256, nullable: false })
    size: string;

    @Column({ type: "int", default: 0 })
    qtyLines: number;

    @Column({ type: "varchar", nullable: true })
    path: string;

    @Column({ type: "varchar", length: 256 })
    encoding: string;

    @Column({ type: "bool", default: false })
    sync: boolean;

    @ManyToOne(type => Folder, folder => folder.files, { onDelete: "CASCADE" })
    folder: Folder;

    @OneToMany(type => Job, job => job.file)
    jobs: Job[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @VersionColumn()
    version: number;

}