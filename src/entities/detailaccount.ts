import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Account } from "./account";

export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

@Entity('detailaccount')
export class DetailAccount {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    phone?: string;

    @Column({ type: 'enum', enum: Gender, nullable: true })
    gender?: Gender;

    @Column({ nullable: true })
    address?: string;

    @Column({ type: 'date', nullable: true })
    birthday?: Date;

    @Column({ type: 'date', nullable: true })
    createdAt?: Date;

    @Column({ type: 'date', nullable: true })
    updatedAt?: Date;

    @OneToOne(() => Account, account => account.detailAccount)
    @JoinColumn() // Đây là nơi đặt khóa ngoại accountId
    account!: Account;
}
