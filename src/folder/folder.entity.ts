import { File } from "src/file/file.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity("folder")
export class Folder extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "varchar", length: 256, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 1000 })
    description: string;

    @ManyToOne(type => User, user => user.folders)
    user: User;

    @OneToMany(type => File, file => file.folder, { eager: true, cascade: true })
    files: File[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @VersionColumn()
    version: number;

}