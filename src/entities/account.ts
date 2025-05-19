import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { DetailAccount } from "./detailaccount";
import { Admin } from "./admin";

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    username!: string;

    @Column({ type: 'text', nullable: true })
    password?: string;

    @Column({ type: 'date', nullable: true })
    createdAt?: Date;

    @Column({ type: 'date', nullable: true })
    updatedAt?: Date;

    @OneToOne(() => DetailAccount, detail => detail.account, { cascade: true })
    detailAccount?: DetailAccount;

    @OneToOne(() => Admin, admin => admin.account)
    admin?: Admin;
}
