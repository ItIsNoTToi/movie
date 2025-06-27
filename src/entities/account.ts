import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { DetailAccount } from "./detailaccount";
import { Admin } from "./admin";
import { Rating } from "./rating";

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

    @OneToMany(() => Rating, rating => rating.account)
    ratings!: Rating[];

    @Column({ default: true })
    isActived!: boolean;
}
