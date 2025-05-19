import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Account } from "./account";

// role.ts
export enum Role {
    Admin = 'Admin',
    User = 'User',
}

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "enum",
        enum: Role,
        default: Role.Admin,})
    role!: Role.User;

    @OneToOne(() => Account, { cascade: true })
    @JoinColumn()
    account!: Account;
}
