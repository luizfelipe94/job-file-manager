import { BaseEntity, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Tenant } from "src/tenant/tenant.entity";
import { Role } from "src/role/role.entity";
import { Folder } from "src/folder/folder.entity";

@Entity("user")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "varchar", length: 256, nullable: false })
    name: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @ManyToOne(type => Tenant, tenant => tenant.users)
    tenant: Tenant;

    @ManyToMany(() => Role, { cascade: true, onDelete: "CASCADE" })
    @JoinTable()
    roles: Role[];

    @OneToMany(type => Folder, folder => folder.user)
    folders: Folder[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @VersionColumn()
    version: number;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toJSON() {
        delete this.password;
        return this;
    }

}